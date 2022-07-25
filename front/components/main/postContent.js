import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const PostContent = ({ content }) => (
  <>
    {content.split(/(#[^\s#]+)/g).map(v => {
      if (v.match(/#[^\s#]+/)) {
        return (
          <Link key={v} href={`/hashtag/${v.slice(1)}`}>
            <a style={{ textDecoration: 'none' }}>{v}</a>
          </Link>
        );
      }
      return v;
    })}
  </>
);

PostContent.propTypes = {
  content: PropTypes.string.isRequired,
};

export default PostContent;
