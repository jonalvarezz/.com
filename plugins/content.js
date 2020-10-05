module.exports = function contentPlugin(env, callback) {
  const getContents = (contents, contentType = "articles") => {
    let content = [];
    debugger;

    try {
      content = contents[contentType]._.directories
        .map((item) => item.index)
        .sort((a, b) => b.date - a.date);
    } catch (e) {
      console.warning(
        `There was an error loading the contents for ${contentType}`
      );
      console.error(e);
    } finally {
      return content;
    }
  };

  env.helpers.getContents = getContents;

  callback();
};
