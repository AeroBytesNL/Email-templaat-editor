import { useEffect, useState } from "react";
import type { EditorProps } from "@maily-to/core";
import { Editor } from "@maily-to/core";
import { Loader2 } from "lucide-react";
import type { JSONContent } from "@tiptap/core";
import { useSearchParams } from "next/navigation";
import { useEditorContext } from "@/stores/editor-store";
import { cn } from "@/utils/classname";

interface EditorPreviewProps {
  className?: string;
  config?: Partial<EditorProps["config"]>;
}

export function EditorPreview(props: EditorPreviewProps) {
  const searchParams = useSearchParams();
  const [decodedContent, setDecodedContent] = useState<JSONContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const { className, config: defaultConfig } = props;
  
  const { editor, setEditor, setJson, setState } = useEditorContext((s) => s);
  
  useEffect(() => {
    const encodedData = searchParams.get("data");
    
    if (encodedData) {
      try {
        const jsonString = decodeURIComponent(atob(encodedData));
        const parsedData = JSON.parse(jsonString) as JSONContent;
        
        setDecodedContent(parsedData);
      } catch (error) {
        console.error("Invalid encoded JSON data:", error);
        setDecodedContent(null); // Set to null on error, no default.
      }
    } else {
      setDecodedContent(null); // Set to null if no data is provided.
    }
    setIsLoading(false);
  }, [searchParams]);
  
  useEffect(() => {
    if (!editor) return;
    
    editor.on("focus", () => setState({ isEditorFocused: true }));
    editor.on("blur", () => setState({ isEditorFocused: false }));
    
    return () => {
      editor.off("focus");
      editor.off("blur");
    };
  }, [editor]);
  
  console.log("Final contentJson passed to Editor:", decodedContent);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center mt-8">
        <Loader2 className="animate-spin text-gray-400" />
      </div>
    );
  }
  
  if (decodedContent === null) {
    return (
      <div className="flex items-center justify-center mt-8">
        <p>Oh, volgensmij heb ik geen JSON data binnen gekregen, AAAH</p>
      </div>
    );
  }
  
  return (
    <div className={cn("mt-8", className)}>
      <div>
        <Editor
          config={{
            hasMenuBar: false,
            wrapClassName: "editor-wrap",
            bodyClassName: "!mt-0 !border-0 !p-0",
            contentClassName: "editor-content",
            toolbarClassName: "flex-wrap !items-start",
            spellCheck: false,
            autofocus: false,
            ...defaultConfig,
          }}
          contentJson={decodedContent}
          onCreate={(e) => {
            setEditor(e);
            setJson(e?.getJSON() || {});
          }}
          onUpdate={(e) => {
            setEditor(e);
            setJson(e?.getJSON() || {});
          }}
        />
      </div>
    </div>
  );
}