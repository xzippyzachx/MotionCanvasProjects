import {makeScene2D, Rect, Node, Ray, Txt, is, Img, Line, Gradient} from '@motion-canvas/2d';
import {all, createRef, waitUntil, easeInOutCubic, range, makeRef, waitFor, Vector2} from '@motion-canvas/core';

import keyboardSvg from '../../images/keyboard-solid.svg';
import clientSvg from '../../images/computer-solid.svg';
import serverSvg from '../../images/server-solid.svg';
import codeFileSvg from '../../images/file-code-solid.svg';
import botSvg from '../../images/robot-solid.svg';

export default makeScene2D(function* (view) {
  
  const arrayBg = createRef<Rect>();
  const arrayTitle = createRef<Txt>();
  const array = <Node x={0}/>

  const forwardKey = createRef<Rect>();
  const forwardLine = createRef<Line>();
  const jumpKey = createRef<Rect>();
  const jumpLine = createRef<Line>();

  const keyboard = createRef<Img>();

  const client = createRef<Node>();
  const server = createRef<Node>();
  const clientServerLine = createRef<Line>();

  const codeFile = createRef<Img>();

  const bot = createRef<Img>();

  view.add(
    <Rect
        height={'100%'}
        width={'100%'}
        fill={() => new Gradient({
          type: 'radial',
          fromRadius: 800,
          toRadius: 1200,
          stops: [
            {offset: 0, color: '#0a0a0a'},
            {offset: 1, color: '#131313'},
          ],
        })}
      />
  );
  
  array.add(
    <>
      <Rect
        ref={arrayBg}
        height={600}
        width={300}
        radius={20}
        fill={'#3a3e44'}
        opacity={0}
      />
      <Txt
        ref={arrayTitle}
        text={'Inputs'}
        y={-350}
        fontWeight={800}
        fill={'#FFFFFF'}
        opacity={0}
      />
    </>
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
        opacity={0}
      />
    )),
  );
  
  const boolTxt: Txt[] = [];
  let bools = ['false','false','false','false','false','false'];
  const boolLabelTxt: Txt[] = [];
  let boolLabels = ['Forward','Backword','Left','Right','Jump','Sprint'];
  array.add(
    range(6).map(i => (
      <Node>
        <Txt
          ref={makeRef(boolTxt, i)}
          text={bools[i]}
          y={(i * 100) - 250}
          fill={'#FFFFFF'}
          opacity={0}
        />
        <Txt
          ref={makeRef(boolLabelTxt, i)}
          text={boolLabels[i]}
          y={(i * 100) - 250}
          x={-250}
          fontSize={40}
          fill={'#FFFFFF'}
          opacity={0}
        />
      </Node>
    )),
  );

  view.add(array);

  view.add(
    <>
      <Img
        ref={keyboard}
        src={keyboardSvg}
        scale={2}
        x={-400}
        opacity={0}
      />
      <Rect
        ref={forwardKey}
        height={38}
        width={38}
        radius={5}
        x={-456}
        y={-56}
        fill={'#25df44'}
        opacity={0}
      />
      <Line
        ref={forwardLine}
        points={[
          [-232, 0],
          [-100, 0],
          [0, -255],
          [50, -255],
        ]}
        stroke={'#FFFFFF'}
        lineWidth={15}
        radius={20}
        end={0}
      />
      <Rect
        ref={jumpKey}
        height={38}
        width={150}
        radius={5}
        x={-400}
        y={56}
        fill={'#25df44'}
        opacity={0}
      />
      <Line
        ref={jumpLine}
        points={[
          [-232, 0],
          [-100, 0],
          [0, 145],
          [50, 145],
        ]}
        stroke={'#FFFFFF'}
        lineWidth={15}
        radius={20}
        end={0}
      />
      <Node 
        ref={client}
        x={600}
        y={-50}
        opacity={0}
      >
        <Img
          src={clientSvg}
          scale={1.5}
        />
        <Txt
        y={-150}
          text={'Client'}
          fill={'#FFFFFF'}
          fontSize={80}
          fontWeight={800}
        />
      </Node>
      <Node 
        ref={server}
        x={-600}
        y={-50}
        opacity={0}
      >
        <Img
          src={serverSvg}
          scale={1.5}
        />
        <Txt
        y={-150}
          text={'Server'}
          fill={'#FFFFFF'}
          fontSize={80}
          fontWeight={800}
        />
      </Node>
      <Line
        ref={clientServerLine}
        points={[
          [460, -50],
          [-460, -50],
        ]}
        stroke={'#FFFFFF'}
        lineWidth={15}
        radius={20}
        end={0}
        endArrow
      />
      <Img
        ref={codeFile}
        src={codeFileSvg}
        scale={1.5}
        y={-50}
        opacity={0}
      />
      <Img
        ref={bot}
        src={botSvg}
        scale={1.5}
        x={-400}
        opacity={0}
      />
    </>
  );

  // Animation
  ////////////////////////////////////////

  yield* waitUntil('ShowArray')

  yield* all(
    arrayBg().opacity(1, easeInOutCubic(0.5)),
    ...lines.map(line => line.opacity(1, 0.5)),
    ...boolTxt.map(txt => txt.opacity(1, 0.5)),
  );

  yield* waitUntil('KeyInputs')

  yield* boolLabelTxt.map(line => line.opacity(1, 0.5)),

  yield* waitUntil('Pressed')

  yield* all(
    ...boolTxt.map(txt => txt.text('true', easeInOutCubic(0.5))),
    ...boolTxt.map(txt => txt.fill('#25df44', easeInOutCubic(0.5))),
  );

  yield* waitUntil('UnPressed')

  yield* all(
    ...boolTxt.map(txt => txt.text('false', easeInOutCubic(0.5))),
    ...boolTxt.map(txt => txt.fill('#FFFFFF', easeInOutCubic(0.5))),
  );

  yield* waitUntil('InputsTitle')

  yield* arrayTitle().opacity(1, easeInOutCubic(0.5)),

  yield* waitUntil('Keyboard')

  yield* all(
    keyboard().opacity(1, easeInOutCubic(0.5)),
    array.position.x(400, easeInOutCubic(0.5)),
  );

  yield* waitUntil('Forward')
  
  yield* all(
    boolTxt[0].text('true', easeInOutCubic(0.5)),
    boolTxt[0].fill('#25df44', easeInOutCubic(0.5)),
    forwardKey().opacity(1, easeInOutCubic(0.5)),
    forwardLine().end(1, easeInOutCubic(0.5))
  );

  yield* waitUntil('Jump')
  
  yield* all(
    boolTxt[4].text('true', easeInOutCubic(0.5)),
    boolTxt[4].fill('#25df44', easeInOutCubic(0.5)),
    jumpKey().opacity(1, easeInOutCubic(0.5)),
    jumpLine().end(1, easeInOutCubic(0.5))
  );

  yield* waitUntil('Compress')

  yield* all(

    keyboard().opacity(0, easeInOutCubic(0.5)),
    forwardKey().opacity(0, easeInOutCubic(0.5)),
    forwardLine().opacity(0, easeInOutCubic(0.5)),
    jumpKey().opacity(0, easeInOutCubic(0.5)),
    jumpLine().opacity(0, easeInOutCubic(0.5)),

    ...lines.map(line => line.opacity(0, 0.25)),
    ...boolTxt.map(txt => txt.opacity(0, 0.25)),
    ...boolLabelTxt.map(txt => txt.opacity(0, 0.25)),
    arrayTitle().position.y(0, easeInOutCubic(0.5)),

    array.findFirst(is(Rect)).height(100, easeInOutCubic(1)),
  ); 

  yield* array.position([600, 150], easeInOutCubic(1)),

  yield* all(
    client().opacity(1, easeInOutCubic(0.5)),
    server().opacity(1, easeInOutCubic(0.5)),
  );

  yield* waitUntil('ClientServer')
  
  yield* all(
    array.position.x(-600, easeInOutCubic(1.5)),
    clientServerLine().end(1, easeInOutCubic(1.5))
  );

  yield* waitUntil('MovementCode')

  yield* all(
    client().opacity(0, easeInOutCubic(0.5)),
    clientServerLine().opacity(0, easeInOutCubic(0.5)),
    clientServerLine().end(0, easeInOutCubic(0.5)),
    array.position.x(0, easeInOutCubic(1)),
    server().position.x(0, easeInOutCubic(1)),
  );

  yield* all(
    server().opacity(0, easeInOutCubic(0.5)),
    codeFile().opacity(1, easeInOutCubic(0.5)),
  );

  yield* waitUntil('Expand')
  
  yield* all(
    codeFile().opacity(0, easeInOutCubic(0.5)),
    array.position([400, 0], easeInOutCubic(1)),
  );
  
  yield* all(
    arrayTitle().position.y(-350, easeInOutCubic(0.5)),
    array.findFirst(is(Rect)).height(600, easeInOutCubic(1)),
  );

  boolTxt[0].text('false')
  boolTxt[0].fill('#FFFFFF')
  boolTxt[4].text('false')
  boolTxt[4].fill('#FFFFFF')

  yield* all(
    ...lines.map(line => line.opacity(1, 0.25)),
    ...boolTxt.map(txt => txt.opacity(1, 0.25)),
    ...boolLabelTxt.map(txt => txt.opacity(1, 0.25)),
  );

  yield* waitUntil('Bot')

  yield* all(
    bot().opacity(1, easeInOutCubic(0.5)),
  );

  forwardLine().opacity(1)
  forwardLine().end(0)
  jumpLine().opacity(1)
  jumpLine().end(0)

  yield* all(
    boolTxt[0].text('true', easeInOutCubic(0.5)),
    boolTxt[0].fill('#25df44', easeInOutCubic(0.5)),
    forwardLine().end(1, easeInOutCubic(0.5)),
  );

  yield* all(
    boolTxt[4].text('true', easeInOutCubic(0.5)),
    boolTxt[4].fill('#25df44', easeInOutCubic(0.5)),
    jumpLine().end(1, easeInOutCubic(0.5))
  );

  yield* waitFor(1)

  yield* all(
    boolTxt[0].text('false', easeInOutCubic(0.5)),
    boolTxt[0].fill('#FFFFFF', easeInOutCubic(0.5)),
    forwardLine().end(0, easeInOutCubic(0.5))
  );

  yield* waitFor(1)

  yield* all(
    boolTxt[4].text('false', easeInOutCubic(0.5)),
    boolTxt[4].fill('#FFFFFF', easeInOutCubic(0.5)),
    jumpLine().end(0, easeInOutCubic(0.5)),

    boolTxt[0].text('true', easeInOutCubic(0.5)),
    boolTxt[0].fill('#25df44', easeInOutCubic(0.5)),
    forwardLine().end(1, easeInOutCubic(0.5))
  );

  yield* waitFor(2)

});

