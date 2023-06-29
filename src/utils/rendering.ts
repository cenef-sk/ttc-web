import mustache from 'mustache';

function render(text, world) {
  return mustache.render(text, world)  
}

export {render};
