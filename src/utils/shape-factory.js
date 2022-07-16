export const SHAPE_TYPES = {
    rectangle: 'rectangle',
    circle: 'circle',
    horizontalLine: 'horizontal-line',
    verticalLine: 'vertical-line',
    text: 'text',
};

export const EDITABLE_PROPS = ['x', 'y', 'x2', 'y2', 'width', 'height', 'r', 'text'];

const createRectangle = () => ({
    x: 350,
    y: 350,
    width: 250,
    height: 100,
    type: SHAPE_TYPES.rectangle,
});

const createCircle = () => ({
    x: 350,
    y: 350,
    r: 50,
    sAngle: 0,
    eAngle: 2 * Math.PI,
    type: SHAPE_TYPES.circle,
});

const createHorizontalLine = () => ({
    x: 350,
    y: 350,
    x2: 450,
    y2: 350,
    type: SHAPE_TYPES.horizontalLine,
});

const createVerticalLine = () => ({
    x: 350,
    y: 350,
    x2: 350,
    y2: 450,
    type: SHAPE_TYPES.verticalLine,
});

const createText = () => ({
    x: 350,
    y: 350,
    text: 'Hello world',
    type: SHAPE_TYPES.text,
});

export const createShape = (type = SHAPE_TYPES.rectangle) => {
    switch(type) {
        case SHAPE_TYPES.rectangle:
            return createRectangle();
        case SHAPE_TYPES.circle:
            return createCircle();
        case SHAPE_TYPES.horizontalLine:
            return createHorizontalLine();
        case SHAPE_TYPES.verticalLine:
            return createVerticalLine();
        case SHAPE_TYPES.text:
            return createText();
        default:
            return createRectangle();
    }
}