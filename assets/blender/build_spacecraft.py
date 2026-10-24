"""Build and export the original Romone journey spacecraft and planet set."""

from pathlib import Path
import math
import bpy
from mathutils import Vector


ROOT = Path(__file__).resolve().parents[2]
MODEL_DIR = ROOT / "public" / "models"
PLANET_MODEL_DIR = MODEL_DIR / "planets"
PLANET_TEX = ROOT / "assets" / "blender" / "planet-maps"
SOURCE_DIR = ROOT / "assets" / "blender"
PREVIEW_DIR = ROOT / "assets" / "previews"
MODEL_DIR.mkdir(parents=True, exist_ok=True)
PLANET_MODEL_DIR.mkdir(parents=True, exist_ok=True)
PREVIEW_DIR.mkdir(parents=True, exist_ok=True)


def material(name, colour, metallic=0.0, roughness=0.5, emission=None):
    mat = bpy.data.materials.new(name)
    mat.diffuse_color = (*colour, 1)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (*colour, 1)
    bsdf.inputs["Metallic"].default_value = metallic
    bsdf.inputs["Roughness"].default_value = roughness
    if emission:
        bsdf.inputs["Emission Color"].default_value = (*emission, 1)
        bsdf.inputs["Emission Strength"].default_value = 2.5
    return mat


def smooth_mesh(obj):
    if obj.type == "MESH":
        for poly in obj.data.polygons:
            poly.use_smooth = True
    return obj


def finish_obj(obj, name, mat, bevel=0.0):
    obj.name = name
    if mat:
        obj.data.materials.append(mat)
    if bevel and obj.type == "MESH":
        mod = obj.modifiers.new("Edge glints", "BEVEL")
        mod.width = bevel
        mod.segments = 2
        mod.profile = 0.5
        bpy.context.view_layer.objects.active = obj
        bpy.ops.object.modifier_apply(modifier=mod.name)
    return obj


def cube(name, location, dimensions, mat, bevel=0.0):
    bpy.ops.mesh.primitive_cube_add(size=1, location=location)
    obj = bpy.context.object
    obj.dimensions = dimensions
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    return finish_obj(obj, name, mat, bevel)


def sphere(name, location, scale, mat, segments=24, rings=16):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=segments, ring_count=rings, radius=1, location=location)
    obj = bpy.context.object
    obj.scale = scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    smooth_mesh(obj)
    return finish_obj(obj, name, mat)


def cylinder_between(name, start, end, radius, mat, vertices=12, radius_end=None):
    start, end = Vector(start), Vector(end)
    delta = end - start
    mid = (start + end) * 0.5
    r2 = radius if radius_end is None else radius_end
    bpy.ops.mesh.primitive_cone_add(vertices=vertices, radius1=radius, radius2=r2, depth=delta.length, location=mid)
    obj = bpy.context.object
    obj.rotation_mode = "QUATERNION"
    obj.rotation_quaternion = delta.to_track_quat("Z", "Y")
    return finish_obj(obj, name, mat)


def torus(name, location, major, minor, mat, rotation=None):
    bpy.ops.mesh.primitive_torus_add(major_radius=major, minor_radius=minor, major_segments=48, minor_segments=8, location=location)
    obj = bpy.context.object
    if rotation:
        obj.rotation_euler = rotation
    smooth_mesh(obj)
    return finish_obj(obj, name, mat)


def hull(name, material_body):
    # Nose points along Blender -Y so the exported glTF forward axis is Three.js +Z.
    profile = [
        (-6.8, 0.02, 0.02), (-6.45, 0.34, 0.32), (-5.7, 0.67, 0.52),
        (-4.5, 0.9, 0.68), (-2.2, 1.0, 0.73), (0.35, 0.91, 0.68),
        (2.0, 0.7, 0.56), (3.0, 0.43, 0.38), (3.45, 0.31, 0.3),
    ]
    radial = 32
    verts, faces = [], []
    for y, rx, rz in profile:
        for j in range(radial):
            a = (j / radial) * 2 * math.pi
            verts.append((math.cos(a) * rx, y, math.sin(a) * rz))
    for i in range(len(profile) - 1):
        for j in range(radial):
            a = i * radial + j
            b = i * radial + ((j + 1) % radial)
            faces.append((a, b, b + radial, a + radial))
    faces.extend([tuple(reversed(tuple(range(radial)))), tuple(range((len(profile) - 1) * radial, len(profile) * radial))])
    mesh = bpy.data.meshes.new(name + " machined shell")
    mesh.from_pydata(verts, [], faces)
    mesh.materials.append(material_body)
    mesh.update()
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)
    smooth_mesh(obj)
    return obj


def nozzle(name, x, engine_mat, liner_mat, glow_mat):
    rings = [(2.45, 0.34), (3.05, 0.4), (3.85, 0.73), (4.15, 0.81)]
    inner = [(2.8, 0.24), (3.24, 0.31), (3.96, 0.61), (4.12, 0.66)]
    sides = 32

    def make_surface(label, sections, mat, reverse=False):
        vertices, faces = [], []
        for y, radius in sections:
            for i in range(sides):
                angle = math.pi * 2 * i / sides
                vertices.append((x + math.cos(angle) * radius, y, math.sin(angle) * radius))
        for j in range(len(sections) - 1):
            for i in range(sides):
                a = j * sides + i
                b = j * sides + (i + 1) % sides
                face = (a, b, b + sides, a + sides)
                faces.append(tuple(reversed(face)) if reverse else face)
        mesh = bpy.data.meshes.new(label)
        mesh.from_pydata(vertices, [], faces)
        mesh.materials.append(mat)
        mesh.update()
        obj = bpy.data.objects.new(label, mesh)
        bpy.context.collection.objects.link(obj)
        smooth_mesh(obj)
        return obj

    make_surface(name + " carbon bell", rings, engine_mat)
    make_surface(name + " hot liner", inner, liner_mat, reverse=True)
    sphere(name + " ion core", (x, 3.05, 0), (0.22, 0.11, 0.22), glow_mat, 16, 8)
    torus(name + " injector ring", (x, 4.08, 0), rings[-1][1] * 0.88, 0.055, engine_mat, (math.pi / 2, 0, 0))


def create_ship(mats):
    hull("Explorer pressure hull", mats["ceramic"])
    # Protected equipment bay and forward observation module.
    cube("Keel and equipment spine", (0, -0.1, -0.18), (0.74, 7.4, 0.5), mats["graphite"], 0.12)
    sphere("Forward sensor pod", (0, -5.03, 0.55), (0.47, 1.15, 0.34), mats["ceramic"], 32, 20)
    for x in [-0.27, 0.27]:
        sphere("Polarised observation port", (x, -5.13, 0.77), (0.14, 0.34, 0.065), mats["glass"], 24, 16)
    torus("Forward docking collar", (0, -6.47, 0), 0.49, 0.09, mats["titanium"], (math.pi / 2, 0, 0))
    torus("Docking latch ring", (0, -6.5, 0), 0.3, 0.035, mats["gold"], (math.pi / 2, 0, 0))
    cylinder_between("Docking throat", (0, -6.56, 0), (0, -6.86, 0), 0.28, mats["graphite"], 32)

    # Two deployable photovoltaic wings: framed arrays with visible cell seams.
    for side in [-1, 1]:
        inner, outer, zbase = 2.0, 6.2, -0.31
        cube("Solar wing spar", (side * 4.1, -0.85, zbase - 0.035), (4.3, 5.45, 0.12), mats["graphite"], 0.035)
        for row in range(5):
            y = -3.0 + row * 1.08
            for col in range(4):
                x = side * (2.15 + col * 0.97)
                cube("Photovoltaic cell", (x, y, zbase + 0.055), (0.9, 0.98, 0.045), mats["solar"], 0.025)
                cube("Cell busbar", (x, y, zbase + 0.081), (0.86, 0.014, 0.008), mats["cell_line"])
        for x in [side * inner, side * outer]:
            cube("Wing titanium rail", (x, -0.85, zbase + 0.02), (0.055, 5.55, 0.075), mats["titanium"], 0.018)
        for y in [-3.6, 1.9]:
            cube("Wing end rail", (side * 4.1, y, zbase + 0.02), (4.3, 0.05, 0.07), mats["titanium"], 0.015)
        cylinder_between("Array deployment boom", (side * 1.0, -0.85, 0.1), (side * 2.25, -0.85, zbase), 0.12, mats["titanium"], 12)
        cylinder_between("Outer array strut", (side * 1.18, 1.1, -0.05), (side * 2.38, 1.1, zbase), 0.055, mats["gold"], 10)

        # Thermal radiators and insulating blanket panels attached to the hull.
        cube("Radiator panel", (side * 0.88, 0.65, 0.42), (0.18, 2.1, 0.62), mats["radiator"], 0.025)
        for y in [-2.7, -1.55, -0.4, 0.75, 1.9]:
            cube("Thermal blanket tile", (side * 0.78, y, 0.58), (0.16, 0.58, 0.2), mats["gold"], 0.018)
        for y in [-2.1, -0.75, 0.6, 1.95]:
            sphere("Attitude thruster", (side * 0.87, y, 0.17), (0.12, 0.18, 0.12), mats["titanium"], 12, 8)
            sphere("Thruster aperture", (side * 0.98, y, 0.17), (0.035, 0.08, 0.08), mats["graphite"], 12, 8)

    # Layered aft propulsion cluster, sized for a deep-space vehicle.
    nozzle("Main engine", 0, mats["engine"], mats["liner"], mats["glow"])
    # Keep a visible air gap between the centre bell and each vernier bell.
    for x in [-1.2, 1.2]:
        nozzle("Verge engine", x, mats["engine"], mats["liner"], mats["glow"])
    for x in [-1.5, 1.5]:
        sphere("Engine gimbal", (x, 3.4, 0), (0.26, 0.37, 0.26), mats["titanium"], 20, 12)

    # Surface panels, access plates, conduits, latches and navigation lamps.
    for side in [-1, 1]:
        for y in [-4.2, -3.1, -1.7, -0.25, 1.25]:
            cylinder_between("Hull conduit", (side * 0.72, y, 0.33), (side * 0.8, y + 0.56, 0.28), 0.045, mats["titanium"], 8)
        for y in [-3.4, -1.9, -0.4, 1.1, 2.35]:
            sphere("Navigation lamp", (side * 0.76, y, 0.48), (0.07, 0.13, 0.07), mats["glow"], 12, 8)
        cube("Side access hatch", (side * 0.67, 0.1, 0.29), (0.06, 0.82, 0.55), mats["graphite"], 0.04)
    for i in range(8):
        y = -3.3 + i * 0.74
        torus("Pressure ring", (0, y, 0), 0.71 + 0.14 * math.sin(i / 8 * math.pi), 0.025, mats["titanium"], (math.pi / 2, 0, 0))

    # A small dorsal high-gain dish and its three-point truss.
    cylinder_between("Comms mast", (0, 1.6, 0.47), (0, 1.7, 1.55), 0.035, mats["titanium"], 10)
    sphere("High gain dish", (0, 1.72, 1.68), (0.76, 0.14, 0.55), mats["ceramic"], 28, 16)
    sphere("Dish feed horn", (0, 1.58, 1.68), (0.14, 0.23, 0.14), mats["gold"], 16, 10)
    for x in [-0.58, 0.58]:
        cylinder_between("Dish support", (x, 1.65, 1.53), (0, 1.61, 1.7), 0.025, mats["titanium"], 8)


def create_planet_material(name):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    nodes, links = mat.node_tree.nodes, mat.node_tree.links
    bsdf = nodes.get("Principled BSDF")
    bsdf.inputs["Roughness"].default_value = 0.82
    albedo = bpy.data.images.load(str(PLANET_TEX / f"{name}-albedo.jpg"), check_existing=True)
    albedo.colorspace_settings.name = "sRGB"
    color_node = nodes.new("ShaderNodeTexImage")
    color_node.image = albedo
    color_node.label = "Procedural albedo"
    links.new(color_node.outputs["Color"], bsdf.inputs["Base Color"])
    normal = bpy.data.images.load(str(PLANET_TEX / f"{name}-normal.png"), check_existing=True)
    normal.colorspace_settings.name = "Non-Color"
    normal_node = nodes.new("ShaderNodeTexImage")
    normal_node.image = normal
    normal_node.label = "Baked tangent-space relief"
    normal_map = nodes.new("ShaderNodeNormalMap")
    links.new(normal_node.outputs["Color"], normal_map.inputs["Color"])
    links.new(normal_map.outputs["Normal"], bsdf.inputs["Normal"])
    return mat


def create_planet(name, location, radius, mat):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=96, ring_count=64, radius=radius, location=location)
    obj = bpy.context.object
    obj.name = f"Planet · {name.title()}"
    smooth_mesh(obj)
    obj.data.materials.append(mat)
    return obj


def export_selected(filepath, objects):
    bpy.ops.object.select_all(action="DESELECT")
    for obj in objects:
        obj.select_set(True)
    bpy.context.view_layer.objects.active = objects[0]
    bpy.ops.export_scene.gltf(filepath=str(filepath), export_format="GLB", use_selection=True, export_apply=True)


def clear_scene():
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)
    for datablocks in (bpy.data.meshes, bpy.data.curves, bpy.data.cameras, bpy.data.lights):
        for item in list(datablocks):
            if item.users == 0:
                datablocks.remove(item)


def join_by_material(objects):
    groups = {}
    for obj in objects:
        if obj.type == "MESH" and obj.data.materials:
            groups.setdefault(obj.data.materials[0].name, []).append(obj)
    for group in groups.values():
        if len(group) < 2:
            continue
        bpy.ops.object.select_all(action="DESELECT")
        for obj in group:
            obj.select_set(True)
        bpy.context.view_layer.objects.active = group[0]
        bpy.ops.object.join()
        group[0].name = group[0].data.materials[0].name + " assembly"


def setup_render(ship_objects, planet_objects):
    scene = bpy.context.scene
    scene.render.engine = "BLENDER_EEVEE"
    scene.eevee.taa_render_samples = 96
    scene.render.resolution_x = 1500
    scene.render.resolution_y = 960
    scene.render.resolution_percentage = 100
    scene.render.image_settings.file_format = "PNG"
    scene.world.color = (0.004, 0.008, 0.022)
    scene.view_settings.view_transform = "AgX"

    def area_light(name, location, energy, color, size, target=(0, 0, 0)):
        data = bpy.data.lights.new(name, "AREA")
        data.energy = energy
        data.shape = "DISK"
        data.size = size
        data.color = color
        obj = bpy.data.objects.new(name, data)
        scene.collection.objects.link(obj)
        obj.location = location
        obj.rotation_euler = (Vector(target) - obj.location).to_track_quat("-Z", "Y").to_euler()

    area_light("Warm key", (5, -7, 11), 2100, (0.74, 0.84, 1.0), 9)
    area_light("Cold rim", (-10, 2, 6), 2600, (0.2, 0.55, 1.0), 8)
    area_light("Warm reflected sun", (4, 9, 3), 1700, (1.0, 0.54, 0.28), 7)
    camera_data = bpy.data.cameras.new("Spacecraft hero camera")
    camera = bpy.data.objects.new("Spacecraft hero camera", camera_data)
    scene.collection.objects.link(camera)
    camera.location = (17, -20, 13)
    camera.rotation_euler = (Vector((0, -0.2, 0)) - camera.location).to_track_quat("-Z", "Y").to_euler()
    camera_data.type = "ORTHO"
    camera_data.ortho_scale = 27
    scene.camera = camera

    # Place small worlds behind the craft for an immediate material/render check.
    for i, obj in enumerate(planet_objects):
        obj.location = (-13 + i * 8.6, 8.3, 2.1 + (i % 2) * 1.2)
        obj.scale = (3.4 + (i % 2) * 0.35,) * 3
    scene.render.filepath = str(PREVIEW_DIR / "spacecraft-and-planets.png")
    scene.render.film_transparent = False
    return scene


def main():
    clear_scene()
    mats = {
        "ceramic": material("Ivory ceramic heatshield", (0.66, 0.72, 0.73), 0.54, 0.29),
        "graphite": material("Graphite composite", (0.038, 0.064, 0.079), 0.67, 0.34),
        "titanium": material("Brushed titanium", (0.35, 0.45, 0.49), 0.82, 0.24),
        "gold": material("Multilayer thermal foil", (0.67, 0.36, 0.13), 0.74, 0.3),
        "glass": material("Optical sapphire glass", (0.025, 0.18, 0.23), 0.42, 0.14),
        "solar": material("Blue photovoltaic cells", (0.012, 0.075, 0.19), 0.62, 0.23),
        "cell_line": material("Photovoltaic busbars", (0.34, 0.56, 0.72), 0.8, 0.25),
        "radiator": material("Dark radiator fins", (0.1, 0.19, 0.22), 0.7, 0.37),
        "engine": material("Refractory carbon nozzle", (0.042, 0.053, 0.061), 0.8, 0.28),
        "liner": material("Copper alloy nozzle liner", (0.37, 0.13, 0.055), 0.82, 0.22),
        "glow": material("Ion engine glow", (0.2, 0.68, 1.0), 0.2, 0.22, (0.12, 0.62, 1.0)),
    }
    create_ship(mats)
    ship_objects = [obj for obj in bpy.context.scene.objects if obj.type == "MESH"]
    join_by_material(ship_objects)
    ship_objects = [obj for obj in bpy.context.scene.objects if obj.type == "MESH"]
    export_selected(MODEL_DIR / "romone-explorer.glb", ship_objects)

    # Make four original, UV-mapped planets and export each to a standalone GLB.
    planet_materials = {name: create_planet_material(name) for name in ("terran", "desert", "ice", "gas")}
    planet_objects = []
    for name, mat in planet_materials.items():
        obj = create_planet(name, (0, 0, 0), 1, mat)
        export_selected(PLANET_MODEL_DIR / f"{name}.glb", [obj])
        planet_objects.append(obj)

    scene = setup_render(ship_objects, planet_objects)
    bpy.ops.wm.save_as_mainfile(filepath=str(SOURCE_DIR / "romone-spaceflight.blend"))
    bpy.ops.render.render(write_still=True)
    print("Exported", MODEL_DIR / "romone-explorer.glb")
    print("Saved Blender source", SOURCE_DIR / "romone-spaceflight.blend")
    print("Rendered preview", scene.render.filepath)


if __name__ == "__main__":
    main()
