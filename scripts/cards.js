const SCROLL_OFFSET = 400;

function onNavigationClick(event) {
  const target = event.target;
  if (target.nodeName.toLowerCase() !== "button") {
    return;
  }

  if (
    !target.className.includes("right") &&
    !target.className.includes("left")
  ) {
    return;
  }

  const cardContainer = hasParentWith(target, (node) =>
    node.className.includes("card-container")
  );
  if (cardContainer == null) {
    return;
  }

  const list = cardContainer.querySelector("ul");
  if (list == null) {
    throw new Error("No list found in the card container");
  }

  if (target.className.includes("right")) {
    list.scrollBy(SCROLL_OFFSET, 0);
  } else if (target.className.includes("left")) {
    list.scrollBy(SCROLL_OFFSET * -1, 0);
  }
}

function hasParentWith(node, callbackFn) {
  if (node.nodeName === "body") {
    return null;
  }

  if (callbackFn(node)) {
    return node;
  }

  return hasParentWith(node.parentElement, callbackFn);
}

document.body.addEventListener("click", onNavigationClick);
