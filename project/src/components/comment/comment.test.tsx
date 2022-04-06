import {render, screen} from '@testing-library/react';
import Comment from './comment';
import CommentType from '../../types/comment';

const expectText = 'This villa';

const fakeComment: CommentType = {
  'id': 1,
  'user': {
    'id': 13,
    'isPro': false,
    'name': 'Zak',
    'avatarUrl': 'https://9.react.pages.academy/static/avatar/4.jpg',
  },
  'rating': 3,
  'comment': expectText,
  'date': '2022-01-31T15:13:26.370Z',
};

describe('Component: Comment', () => {

  it('should render correctly', () => {

    render(
      <Comment comment={fakeComment} />,
    );

    expect(screen.getByText(expectText)).toBeInTheDocument();
  });
});
