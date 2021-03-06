import BlogPostComponent from "../../commponents/blogPost";

export default function BlogPage() {
  return (
    <>
      <div className="container">
        <div className="blog" id="top">
          <BlogPostComponent />
          <div className="blogAside">
            <h3 className="blogAsideTitle">Последние посты</h3>
            <ul>
              <li>
                <a href="#top">Какой-то последний пост1</a>
              </li>
              <li>
                <a href="#top">Какой-то последний пост2</a>
              </li>
              <li>
                <a href="#top">Какой-то последний пост3</a>
              </li>
              <li>
                <a href="#top">Какой-то последний пост4</a>
              </li>
              <li>
                <a href="#top">Какой-то последний пост5</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
