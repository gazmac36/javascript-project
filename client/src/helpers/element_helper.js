const elementHelper = function(tagName, attributes){ // This would be called like this: const newListElement = elementHelper('li', {'class': 'card'});
  const element = document.createElement(tagName);
  for(const attrib in attributes) // not sure if const is okay
    element.setAttribute(attrib, attributes[attrib]);
  return element;
};

module.exports = elementHelper;