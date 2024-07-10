import {makeScene2D, Rect, Node, Ray, Txt, is, Img, Line, Gradient} from '@motion-canvas/2d';
import {all, chain, createRef, waitUntil, easeInOutCubic, range, makeRef, waitFor, Vector2, linear} from '@motion-canvas/core';

import clientSvg from '../../images/computer-solid.svg';
import serverSvg from '../../images/server-solid.svg';

export default makeScene2D(function* (view) {
  
  const server = createRef<Node>();
  const client = createRef<Node>();
  const line = createRef<Line>();

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
          x={500}
          y={50}
          opacity={0}
        >
          <Img
            src={clientSvg}
            scale={1.5}
          />
          <Txt
          y={-150}
            text={'Client Codebase'}
            fill={'#FFFFFF'}
            fontSize={80}
            fontWeight={800}
          />
        </Node>
        <Node 
          ref={server}
          x={-500}
          y={50}
          opacity={0}
        >
          <Img
            src={serverSvg}
            scale={1.5}
          />
          <Txt
          y={-150}
            text={'Server Codebase'}
            fill={'#FFFFFF'}
            fontSize={80}
            fontWeight={800}
          />
        </Node>
        <Line
          ref={line}
          points={[
            [0, 0],
            [0, 0],
          ]}
          stroke={'#FFFFFF'}
          lineWidth={15}
          radius={20}
        />
      </>
  )


  // Animation
  ////////////////////////////////////////

  yield* waitUntil('Start')

  yield* line().points([[0, -550],[0, 550],], easeInOutCubic(0.5))

  yield* all(
    client().opacity(1, easeInOutCubic(0.5)),
    server().opacity(1, easeInOutCubic(0.5)),
  );

  yield* waitFor(7)


});

