const express = require("express");
const path = require("path");
const fs = require("fs");
const { getPostById } = require("./stub/posts");
const app = express();

const PORT = process.env.PORT || 3000;
const indexPath = path.resolve(__dirname, "..", "build", "index.html");

// static resources should just be served as they are
app.use(
  express.static(path.resolve(__dirname, "..", "build"), { maxAge: "30d" })
);

// here we serve the index.html page
// app.get("/", (req, res, next) => {
//   fs.readFile(indexPath, "utf8", (err, htmlData) => {
//     if (err) {
//       console.error("Something went wrong:", err);
//       return res.status(500).send("Oops, better luck next time!");
//     }

//     // inject meta tags
//     htmlData = htmlData
//       .replace("<title>React App</title>", `<title>${"Default Title"}</title>`)
//       .replace("__META_OG_TITLE__", "Default Title")
//       .replace("__META_OG_DESCRIPTION__", "Default Description")
//       .replace("__META_DESCRIPTION__", "Default Description")
//       .replace(
//         "__META_OG_IMAGE__",
//         "https://i.pinimg.com/originals/37/6d/63/376d63b86bab91a17b494bda7df0a764.png"
//       );

//     return res.send(htmlData);
//   });
// });

app.get("/posts", (req, res, next) => {
  fs.readFile(indexPath, "utf8", (err, htmlData) => {
    if (err) {
      console.error("Error during file reading", err);
      return res.status(404).end();
    }
    // get post info
    const postId = req.query.id;
    const post = getPostById(postId);
    if (!post) return res.status(404).send("Post not found");

    // inject meta tags
    // htmlData = htmlData
    //   .replace("<title>React App</title>", `<title>${post.title}</title>`)
    //   .replace("__META_OG_TITLE__", post.title)
    //   .replace("__META_OG_DESCRIPTION__", post.description)
    //   .replace("__META_DESCRIPTION__", post.description)
    //   .replace("__META_OG_IMAGE__", post.thumbnail);
    htmlData = htmlData
      .replace("<title>React App</title>", `<title>${"Default Title"}</title>`)
      .replace("Demo", "Default Title")
      .replace("Demo Market Description", "Default Description")
      .replace("Demo Market Description", "Default Description")
      .replace(
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/D.E.M.O._Logo_2006.svg/2560px-D.E.M.O._Logo_2006.svg.png",
        "https://i.pinimg.com/originals/37/6d/63/376d63b86bab91a17b494bda7df0a764.png"
      );

    return res.send(htmlData);
  });
});

// listening...
app.listen(PORT, (error) => {
  if (error) {
    return console.log("Error during app startup", error);
  }
  console.log("listening on " + PORT + "...");
});
