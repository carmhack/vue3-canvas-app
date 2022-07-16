import { SHAPE_TYPES } from "./shape-factory";

const isMouseInsideRectangle = (x, y, shape) => {
  const shapeLeft = shape.x;
  const shapeTop = shape.y;
  const shapeRight = shapeLeft + shape.width;
  const shapeBottom = shapeTop + shape.height;

  if (
    x > shapeLeft && x < shapeRight &&
    y > shapeTop && y < shapeBottom
  ) {
    return true;
  }

  return false;
}

const isMouseInsideCircle = (x, y, shape) => {
  const shapeLeft = shape.x - shape.r;
  const shapeTop = shape.y - shape.r;
  const shapeRight = shapeLeft + (shape.r * 2);
  const shapeBottom = shapeTop + (shape.r * 2);

  if (
    x > shapeLeft && x < shapeRight &&
    y > shapeTop && y < shapeBottom
  ) {
    return true;
  }

  return false;
}

const isMouseInsideLine = (x, y, shape) => {
  const DELTA = 120;
  const shapeLeft = shape.x - DELTA;
  const shapeTop = shape.y - DELTA;
  const shapeRight = shape.x2 + DELTA;
  const shapeBottom = shape.y2 + DELTA;

  if (
    x > shapeLeft && x < shapeRight &&
    y > shapeTop && y < shapeBottom
  ) {
    return true;
  }

  return false;
}

const isMouseInsideText = (x, y, shape) => {
  const FONT_SIZE = 30;

  const shapeLeft = shape.x;
  const shapeTop = shape.y - FONT_SIZE;
  const shapeRight = shapeLeft + (shape.text.length * 15);
  const shapeBottom = shape.y;

  if (
    x > shapeLeft && x < shapeRight &&
    y > shapeTop && y < shapeBottom
  ) {
    return true;
  }

  return false;
}

export const isMouseInsideShape = (x, y, shape) => {
  switch (shape.type) {
    case SHAPE_TYPES.rectangle:
      return isMouseInsideRectangle(x, y, shape);
    case SHAPE_TYPES.circle:
      return isMouseInsideCircle(x, y, shape);
    case SHAPE_TYPES.horizontalLine:
      return isMouseInsideLine(x, y, shape);
    case SHAPE_TYPES.verticalLine:
      return isMouseInsideLine(x, y, shape);
    case SHAPE_TYPES.text:
      return isMouseInsideText(x, y, shape);
  }
}