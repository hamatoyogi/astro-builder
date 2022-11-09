import { useEffect, useState } from 'react';
import { BuilderComponent, builder, useIsPreviewing } from '@builder.io/react';

const apiKey = import.meta.env.VITE_BUILDER_API_KEY;

// For React Builder
builder.init(apiKey);

// set whether you're using the Visual Editor,
// whether there are changes,
// and render the content if found
export function BuilderReact() {
  const isPreviewingInBuilder = useIsPreviewing();
  const [notFound, setNotFound] = useState(false);
  const [content, setContent] = useState(null);

  // get the page content from Builder
  useEffect(() => {
    console.log('render');
    console.log('apiKey');
    async function fetchContent() {
      const content = await builder
        .get('page', {
          url: window?.location?.pathname,
        })
        .promise();

      setContent(content);
      setNotFound(!content);
    }
    fetchContent();
  }, [window.location.pathname]);

  // if no page is found, return a 404 page
  if (notFound && !isPreviewingInBuilder) {
    return <div>404 - Not found</div>;
  }

  return (
    <>
      <head>
        <title>{content?.data.title}</title>
      </head>
      {/* Render the Builder page */}
      <BuilderComponent model='page' content={content} />
    </>
  );
}
