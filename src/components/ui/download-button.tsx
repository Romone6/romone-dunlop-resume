"use client";

import { useState, useEffect } from "react";
import { FileText } from "lucide-react";
import { RESUME_DATA } from "@/lib/data";

export function DownloadButton() {
    const [count, setCount] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem("resume_downloads");
        if (saved) setCount(parseInt(saved, 10));
    }, []);

    const handleDownload = () => {
        const newCount = count + 1;
        setCount(newCount);
        localStorage.setItem("resume_downloads", newCount.toString());
    };

    return (
        <div className="flex flex-col items-start gap-2">
            <a
                href={`/docs/${RESUME_DATA.download_resume_filename}`}
                download
                onClick={handleDownload}
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-accent rounded-lg hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20"
            >
                <FileText className="w-5 h-5 mr-2" />
                Download Resume
            </a>
            {mounted && count > 0 && (
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                    Downloaded {count} times
                </span>
            )}
        </div>
    );
}
