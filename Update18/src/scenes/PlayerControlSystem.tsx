import {makeScene2D, Rect, Node, Ray, Txt, is} from '@motion-canvas/2d';
import {all, createRef, waitUntil, easeInOutCubic, range, makeRef} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  
  const square = createRef<Rect>();
  const arrayTitle = createRef<Txt>();
  const array = <Node x={0}/>
  
  array.add(
      <Rect
        ref={square}
        height={600}
        width={300}
        radius={20}
        fill={'#3a3e44'}
      />
  );
  
  const lines: Ray[] = [];
  array.add(
    range(5).map(i => (
      <Ray
        ref={makeRef(lines, i)}
        lineWidth={2}
        stroke={'#919191'}
        y={(i * 100) - 200}
        fromX={-150}
        toX={150}
      />
    )),
  );
  
  const boolTxt: Txt[] = [];
  let bools = ['false','false','false','false','false','false'];
  array.add(
    range(6).map(i => (
      <Txt
        ref={makeRef(boolTxt, i)}
        text={bools[i]}
        y={(i * 100) - 250}
        fill={'#FFFFFF'}
      />
    )),
  );
  
  const boolLabelTxt: Txt[] = [];
  let boolLabels = ['Forward','Backword','Left','Right','Jump','Sprint'];
  array.add(
    range(6).map(i => (
      <Txt
        ref={makeRef(boolLabelTxt, i)}
        text={boolLabels[i]}
        y={(i * 100) - 250}
        x={-300}
        fill={'#FFFFFF'}
      />
    )),
  );

  array.add(
    <Txt
        ref={arrayTitle}
        text={'Inputs'}
        y={-350}
        fill={'#FFFFFF'}
      />
  );

  view.add(array);

  yield* waitUntil('Forward'),
  
  yield* all(
    boolTxt[0].text('true', easeInOutCubic(0.5)),
    boolTxt[0].fill('#25df44', easeInOutCubic(0.5)),
  );

  yield* waitUntil('Jump'),
  
  yield* all(
    boolTxt[4].text('true', easeInOutCubic(0.5)),
    boolTxt[4].fill('#25df44', easeInOutCubic(0.5)),
  );

  yield* waitUntil('Compress'),

  yield* all(

    ...lines.map(line => line.opacity(0, 0.25)),
    ...boolTxt.map(line => line.opacity(0, 0.25)),
    ...boolLabelTxt.map(line => line.opacity(0, 0.25)),
    arrayTitle().position.y(0, easeInOutCubic(0.5)),

    array.findFirst(is(Rect)).height(100, easeInOutCubic(1)),
  );

});

