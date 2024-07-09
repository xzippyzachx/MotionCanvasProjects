import {makeScene2D, Rect, Node, Ray, Txt, is, Img, Line, Gradient} from '@motion-canvas/2d';
import {all, chain, createRef, waitUntil, easeInOutCubic, range, makeRef, waitFor, Vector2, linear} from '@motion-canvas/core';

import clientSvg from '../../images/computer-solid.svg';
import serverSvg from '../../images/server-solid.svg';
import steamSvg from '../../images/steam-icon.svg';
import envelope from '../../images/small-mail-envelope.svg';


export default makeScene2D(function* (view) {
  
  
  const clientHost = createRef<Node>();
  const client = createRef<Node>();
  const steamServer = createRef<Node>();

  const hostServerLine = createRef<Line>();
  const clientServerLine = createRef<Line>();

  const envelope1 = createRef<Img>();

  view.add(
    <>
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
    </>
  );

  view.add(
    <>
      <Node 
          ref={client}
          x={600}
          y={200}
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
          ref={clientHost}
          x={-600}
          y={200}
          opacity={0}
        >
          <Img
            src={clientSvg}
            scale={1.5}
          />
          <Txt
          y={-150}
            text={'Host'}
            fill={'#FFFFFF'}
            fontSize={80}
            fontWeight={800}
          />
        </Node>
        <Node 
          ref={steamServer}
          x={0}
          y={-200}
          opacity={0}
        >
          <Img
            src={serverSvg}
            scale={1.5}
          />
          <Txt
          y={-150}
            text={'Steam Server'}
            fill={'#FFFFFF'}
            fontSize={80}
            fontWeight={800}
          />
          <Img
            src={steamSvg}
            scale={0.5}
            x={-75}
            y={55}
          />
          <Img
            src={steamSvg}
            scale={0.5}
            x={-75}
            y={-55}
          />
        </Node>
        <Line
          ref={hostServerLine}
          points={[
            [-480, 80],
            [-130, -140],
          ]}
          stroke={'#FFFFFF'}
          lineWidth={15}
          radius={20}
          end={0}
          endArrow
          startArrow
        />
        <Line
          ref={clientServerLine}
          points={[
            [130, -140],
            [480, 80],
          ]}
          stroke={'#FFFFFF'}
          lineWidth={15}
          radius={20}
          end={0}
          endArrow
          startArrow
        />
        <Img
            ref={envelope1}
            src={envelope}
            scale={0.1}
            x={-600}
            y={150}
            opacity={0}
          />
      </>
  )


  // Animation
  ////////////////////////////////////////

  yield* waitUntil('Start')

  yield* all(
    client().opacity(1, easeInOutCubic(0.5)),
    clientHost().opacity(1, easeInOutCubic(0.5)),
    steamServer().opacity(1, easeInOutCubic(0.5)),
  );

  yield* waitFor(0.5)

  yield* hostServerLine().end(1, easeInOutCubic(1))

  yield* clientServerLine().end(1, easeInOutCubic(1))

  yield* waitUntil('Message')

  yield* all(
    envelope1().opacity(1, easeInOutCubic(0.5)),
    envelope1().position([-350, -140], 0.5, linear),
  );

  yield* all(
    envelope1().opacity(0, easeInOutCubic(0.5)),
    envelope1().position([0, -200], 0.5, linear),
  );

  yield* all(
    envelope1().opacity(1, easeInOutCubic(0.5)),
    envelope1().position([350, -140], 0.5, linear),
  );

  yield* all(
    envelope1().opacity(0, easeInOutCubic(0.5)),
    envelope1().position([600, 150], 0.5, linear),
  );

  yield* all(
    envelope1().opacity(1, easeInOutCubic(0.5)),
    envelope1().position([350, -140], 0.5, linear),
  );

  yield* all(
    envelope1().opacity(0, easeInOutCubic(0.5)),
    envelope1().position([0, -200], 0.5, linear),
  );

  yield* all(
    envelope1().opacity(1, easeInOutCubic(0.5)),
    envelope1().position([-350, -140], 0.5, linear),
  );

  yield* all(
    envelope1().opacity(0, easeInOutCubic(0.5)),
    envelope1().position([-600, 150], 0.5, linear),
  );


});

