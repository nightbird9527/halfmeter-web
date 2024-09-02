import {screen, render} from '@testing-library/react';
import {TiptapEditor} from 'src/components';

test('load and display bold', async () => {
  render(<TiptapEditor editorIsEmptyRef={true} editorContentRef={{current: ''}} />);

  const boldButton = screen.getByText('bold');
  // console.log(boldButton);
  expect(screen.getByText('bold')).toHaveTextContent('bold');
});
