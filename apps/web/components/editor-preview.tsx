'use client';

import { useEffect, useState } from 'react';
import type { EditorProps } from '@maily-to/core';
import { Editor } from '@maily-to/core';
import { Loader2, X } from 'lucide-react';
import type { JSONContent } from '@tiptap/core';
import { useEditorContext } from '@/stores/editor-store';
import { cn } from '@/utils/classname';
import { Input } from './ui/input';
import { PreviewTextInfo } from './preview-text-info';
import { Label } from './ui/label';
import defaultEditorJSON from '../utils/default-editor-json.json';
import dynamic from 'next/dynamic';

interface EditorPreviewProps {
  className?: string;
  content?: JSONContent;
  config?: Partial<EditorProps['config']>;
}

export function EditorPreview(props: EditorPreviewProps) {
  const {
    className,
    content: defaultContent = defaultEditorJSON,
    config: defaultConfig,
  } = props;
  const {
    editor,
    previewText,
    setPreviewText,
    setEditor,
    setJson,
    subject,
    setSubject,
    from,
    setFrom,
    replyTo,
    setReplyTo,
    to,
    setTo,
    apiKey,

    isEditorFocused,
    setState,
  } = useEditorContext((s) => s);

  const [showReplyTo, setShowReplyTo] = useState(false);

  useEffect(() => {
    if (!editor) {
      return;
    }

    editor.on('focus', () => {
      setState({
        isEditorFocused: true,
      });
    });

    editor.on('blur', () => {
      setState({
        isEditorFocused: false,
      });
    });

    return () => {
      editor.off('focus');
      editor.off('blur');
    };
  }, [editor]);

  return (
    <div className={cn('mt-8', className)}>

      <div>
        {!editor ? (
          <div className="flex items-center justify-center">
            <Loader2 className="animate-spin text-gray-400" />
          </div>
        ) : null}

        <Editor
          config={{
            hasMenuBar: false,
            wrapClassName: 'editor-wrap',
            bodyClassName: '!mt-0 !border-0 !p-0',
            contentClassName: 'editor-content',
            toolbarClassName: 'flex-wrap !items-start',
            spellCheck: false,
            autofocus: false,
            ...defaultConfig,
          }}
          contentJson={defaultContent}
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
