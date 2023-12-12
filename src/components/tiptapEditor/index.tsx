import React from 'react';
import { EditorContent, useEditor, FloatingMenu, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import EditorToolbar from './editorToolBar'
import './index.scss'

interface ITiptapEditorProps {
	editorIsEmptyRef: any,
	editorContentRef: any
}
const TiptapEditor: React.FC<ITiptapEditorProps> = (props) => {
	const { editorIsEmptyRef, editorContentRef } = props;
	const editor = useEditor({
		extensions: [StarterKit],
		content: editorContentRef.current,
	})

	if (!editor) {
		return null
	}

	return (
		<div className='tiptap-editor-component'>
			<EditorToolbar editor={editor} editorIsEmptyRef={editorIsEmptyRef} editorContentRef={editorContentRef} />
			<EditorContent editor={editor} className='tiptap-editor-content' />
			<FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
			<BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
		</div>
	)
}

export default TiptapEditor