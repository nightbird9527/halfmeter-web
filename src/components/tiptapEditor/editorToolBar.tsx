import React, {useEffect} from 'react';
import {Button, Space} from 'antd';
import {EventBus} from 'src/utils';

interface IEditorToolbarProps {
  editor: any;
  editorIsEmptyRef: any;
  editorContentRef: any;
}

const EditorToolbar: React.FC<IEditorToolbarProps> = (props) => {
  const {editor, editorIsEmptyRef, editorContentRef} = props;

  useEffect(() => {
    EventBus.subscribe('tiptapFinish', () => {
      editorIsEmptyRef.current = editor?.isEmpty;
      editorContentRef.current = editor?.getHTML();
    });
  }, []);

  if (!editor) {
    return null;
  }

  return (
    <div className="tiptap-editor-toolbar">
      <Space wrap={true}>
        <Button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          bold
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          italic
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          strike
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive('code') ? 'is-active' : ''}
        >
          code
        </Button>
        <Button onClick={() => editor.chain().focus().unsetAllMarks().run()}>clear marks</Button>
        <Button onClick={() => editor.chain().focus().clearNodes().run()}>clear nodes</Button>
        <Button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? 'is-active' : ''}
        >
          paragraph
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
          className={editor.isActive('heading', {level: 1}) ? 'is-active' : ''}
        >
          h1
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
          className={editor.isActive('heading', {level: 2}) ? 'is-active' : ''}
        >
          h2
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
          className={editor.isActive('heading', {level: 3}) ? 'is-active' : ''}
        >
          h3
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({level: 4}).run()}
          className={editor.isActive('heading', {level: 4}) ? 'is-active' : ''}
        >
          h4
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({level: 5}).run()}
          className={editor.isActive('heading', {level: 5}) ? 'is-active' : ''}
        >
          h5
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHeading({level: 6}).run()}
          className={editor.isActive('heading', {level: 6}) ? 'is-active' : ''}
        >
          h6
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          bullet list
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
          ordered list
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
        >
          code block
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'is-active' : ''}
        >
          blockquote
        </Button>
        <Button onClick={() => editor.chain().focus().setHorizontalRule().run()}>horizontal rule</Button>
        <Button onClick={() => editor.chain().focus().setHardBreak().run()}>hard break</Button>
        <Button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          undo
        </Button>
        <Button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          redo
        </Button>
        <Button
          // onClick={() => editor.chain().focus().setColor('#958DF1').run()}
          className={editor.isActive('textStyle', {color: '#958DF1'}) ? 'is-active' : ''}
        >
          purple
        </Button>
      </Space>
    </div>
  );
};

export default EditorToolbar;
