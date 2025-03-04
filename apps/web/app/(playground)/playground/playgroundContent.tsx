"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { EditorTopbar } from "@/components/editor-topbar";
import { EditorPreview } from "@/components/editor-preview";
import { Footer } from "@/components/footer";

export default function PlaygroundContent() {
	const searchParams = useSearchParams();
	const [decodedData, setDecodedData] = useState<object | null>(null);
	
	useEffect(() => {
		const encodedData = searchParams.get("data");
		if (encodedData) {
			try {
				const jsonString = decodeURIComponent(atob(encodedData));
				const parsedData = JSON.parse(jsonString);
				setDecodedData(parsedData);
			} catch (error) {
				console.error("Invalid encoded data:", error);
				setDecodedData(null);
			}
		}
	}, [searchParams]);
	
	console.log("Decoded Data:", decodedData);
	console.log("Type of decodedData:", typeof decodedData);
	
	return (
		<main className="mx-auto w-full max-w-[calc(600px+40px)] px-5">
			<header className="mt-14 border-b pb-6">
				<h1 className="text-3xl">Email Template Maker</h1>
			</header>
			<EditorTopbar className="mt-6" />
			<EditorPreview content={decodedData || {}} />
			<Footer />
		</main>
	);
}
