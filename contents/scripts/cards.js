const SCROLL_OFFSET = 400;

function onNavigationClick(event) {
  const target = event.target;
  if (target.nodeName !== "A") {
    return;
  }

  const direction = target.dataset.cardDirection;

  if (!direction) {
    return;
  }

  const cardContainer = hasParentWith(target, (node) =>
    node.className.includes("card-container")
  );
  if (cardContainer == null) {
    throw new Error("No .card-container were found");
  }

  const list = cardContainer.querySelector("ul");
  if (list == null) {
    throw new Error("No list found in the card container");
  }

  event.preventDefault();

  if (direction === "right") {
    list.scrollBy(SCROLL_OFFSET, 0);
  } else if (direction === "left") {
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
