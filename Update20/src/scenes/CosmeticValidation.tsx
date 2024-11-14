import {makeScene2D, Rect, Node, Ray, Txt, is, Img, Line, Gradient} from '@motion-canvas/2d';
import {all, chain, createRef, waitUntil, easeInOutCubic, range, makeRef, waitFor, Vector2, linear} from '@motion-canvas/core';

import clientSvg from '../../images/computer-solid.svg';
import serverSvg from '../../images/server-solid.svg';
import databaseSvg from '../../images/database-solid.svg';
import fileSvg from '../../images/file-lines-solid.svg';

import polyGuyPng from '../../images/PolyGuy.png';
import polyGuyShadesPng from '../../images/PolyGuyShades.png';


export default makeScene2D(function* (view) {
    
  const localClient = createRef<Node>();
  const otherClients = createRef<Node>();
  const server = createRef<Node>();

  const file = createRef<Img>();
  const database = createRef<Img>();

  const polyGuyLocal = createRef<Img>();
  const polyGuyShadesLocal = createRef<Img>();

  const polyGuy1 = createRef<Img>();
  const polyGuyShades1 = createRef<Img>();
  const polyGuy2 = createRef<Img>();
  const polyGuyShades2 = createRef<Img>();
  const polyGuy3 = createRef<Img>();
  const polyGuyShades3 = createRef<Img>();

  const unlockedText = createRef<Text>();

  const fileLine = createRef<Line>();
  const clientLocalLine = createRef<Line>();
  const client1Line = createRef<Line>();
  const client2Line = createRef<Line>();
  const client3Line = createRef<Line>();
  const databaseLine = createRef<Line>();


  const line1 = createRef<Line>();
  const line2 = createRef<Line>();

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
          ref={localClient}
          x={-640}
          y={-475}
          opacity={0}
        >
          <Img
            x={-240}
            src={clientSvg}
            scale={0.5}
          />
          <Txt
            y={7.5}
            text={'Local Client'}
            fill={'#FFFFFF'}
            fontSize={60}
            fontWeight={800}
          />
        </Node>

        <Img
          ref={polyGuyLocal}
          x={-640}
          y={-240}
          src={polyGuyPng}
          scale={0.25}
          opacity={0}
        />
        <Img
          ref={polyGuyShadesLocal}
          x={-640}
          y={-240}
          src={polyGuyShadesPng}
          scale={0.25}
          opacity={0}
        />

        <Img
          ref={file}
          x={-640}
          y={240}
          src={fileSvg}
          scale={1}
          opacity={0}
        />
        
        <Node 
          ref={server}
          x={0}
          y={-475}
          opacity={0}
        >
          <Img
            x={-240}
            src={serverSvg}
            scale={0.5}
          />
          <Txt
            y={7.5}
            text={'Server'}
            fill={'#FFFFFF'}
            fontSize={60}
            fontWeight={800}
          />
        </Node>

        <Img
          ref={database}
          x={0}
          y={240}
          src={databaseSvg}
          scale={1}
          opacity={0}
        />

        <Node 
          ref={otherClients}
          x={640}
          y={-475}
          opacity={0}
        >
          <Img
            x={-240}
            src={clientSvg}
            scale={0.5}
          />
          <Txt
            y={7.5}
            text={'Other Clients'}
            fill={'#FFFFFF'}
            fontSize={60}
            fontWeight={800}
          />
        </Node>

        <Txt
        ref={unlockedText}
          y={7.5}
          text={'Unlocked'}
          fill={'#FFFFFF'}
          fontSize={60}
          fontWeight={800}
          opacity={0}
        />

        <Img
          ref={polyGuy1}
          x={640}
          y={-240}
          src={polyGuyPng}
          scale={0.25}
          opacity={0}
        />
        <Img
          ref={polyGuyShades1}
          x={640}
          y={-240}
          src={polyGuyShadesPng}
          scale={0.25}
          opacity={0}
        />

        <Img
          ref={polyGuy2}
          x={640}
          y={0}
          src={polyGuyPng}
          scale={0.25}
          opacity={0}
        />
        <Img
          ref={polyGuyShades2}
          x={640}
          y={0}
          src={polyGuyShadesPng}
          scale={0.25}
          opacity={0}
        />

        <Img
          ref={polyGuy3}
          x={640}
          y={240}
          src={polyGuyPng}
          scale={0.25}
          opacity={0}
        />
        <Img
          ref={polyGuyShades3}
          x={640}
          y={240}
          src={polyGuyShadesPng}
          scale={0.25}
          opacity={0}
        />

        <Line
          ref={fileLine}
          points={[
            [-600, 240],
            [-400, 240],
            [-400, 0],
            [-150, 0],
          ]}
          stroke={'#FFFFFF'}
          lineWidth={15}
          radius={20}
          end={0}
          endArrow
        />
        <Line
          ref={clientLocalLine}
          points={[
            [-160, 0],
            [-400, 0],
            [-400, -240],
            [-600, -240],
          ]}
          stroke={'#FFFFFF'}
          lineWidth={15}
          radius={20}
          end={0}
          endArrow
        />
        <Line
          ref={client1Line}
          points={[
            [150, 0],
            [400, 0],
            [400, -240],
            [600, -240],
          ]}
          stroke={'#FFFFFF'}
          lineWidth={15}
          radius={20}
          end={0}
          endArrow
        />
        <Line
          ref={client2Line}
          points={[
            [150, 0],
            [400, 0],
            [600, 0],
          ]}
          stroke={'#FFFFFF'}
          lineWidth={15}
          radius={20}
          end={0}
          endArrow
        />
        <Line
          ref={client3Line}
          points={[
            [150, 0],
            [400, 0],
            [400, 240],
            [600, 240],
          ]}
          stroke={'#FFFFFF'}
          lineWidth={15}
          radius={20}
          end={0}
          endArrow
        />

        <Line
          ref={databaseLine}
          points={[
            [0, 50],
            [0, 150],
          ]}
          stroke={'#FFFFFF'}
          lineWidth={15}
          radius={20}
          end={0.5}
          start={0.5}
          endArrow
          startArrow
        />
          
        <Line
          ref={line1}
          points={[
            [-320, 0],
            [-320, 0],
          ]}
          stroke={'#ffffff70'}
          lineWidth={10}
          radius={20}
        />
        <Line
          ref={line2}
          points={[
            [320, 0],
            [320, 0],
          ]}
          stroke={'#ffffff70'}
          lineWidth={10}
          radius={20}
        />
      </>
  )


  // Animation
  ////////////////////////////////////////

  yield* waitFor(0.5)

  yield* all(
    localClient().opacity(1, 0.5),
    server().opacity(1, 0.5),
    otherClients().opacity(1, 0.5),
    line1().points([[-320, -550],[-320, 550],], 0.5),
    line2().points([[320, -550],[320, 550],], 0.5),
  );

  yield* waitFor(1.5)

  yield* file().opacity(1, 0.5)

  yield* waitFor(0.5)

  yield* fileLine().end(1, 2)
 
  yield* waitFor(4)

  yield* unlockedText().opacity(1, 0.5)

  yield* waitFor(4)

  yield* database().opacity(1, 0.5)
  yield* all(
    databaseLine().end(1, 1),
    databaseLine().start(0, 1),
  )

  yield* waitFor(3)

  yield* unlockedText().fill('#00FF00', 0.5)

  yield* all(
    clientLocalLine().end(1, 2),
    client1Line().end(1, 2),
    client2Line().end(1, 2),
    client3Line().end(1, 2),
  )

  yield* all(
    polyGuyShadesLocal().opacity(1, 0.5),
    polyGuyShades1().opacity(1, 0.5),
    polyGuyShades2().opacity(1, 0.5),
    polyGuyShades3().opacity(1, 0.5),
  )

  yield* waitFor(4)

  yield* all(
    clientLocalLine().end(0, 0.5),
    client1Line().end(0, 0.5),
    client2Line().end(0, 0.5),
    client3Line().end(0, 0.5),
    unlockedText().text('Locked', 0.5),
    unlockedText().fill('#FF0000', 0.5),

    polyGuyShadesLocal().opacity(0, 0.5),
    polyGuyShades1().opacity(0, 0.5),
    polyGuyShades2().opacity(0, 0.5),
    polyGuyShades3().opacity(0, 0.5),
  )

  yield* waitFor(1)

  yield* all(
    clientLocalLine().end(1, 2),
    client1Line().end(1, 2),
    client2Line().end(1, 2),
    client3Line().end(1, 2),
  )

  yield* all(
    polyGuyLocal().opacity(1, 0.5),
    polyGuy1().opacity(1, 0.5),
    polyGuy2().opacity(1, 0.5),
    polyGuy3().opacity(1, 0.5),
  )

  yield* waitFor(10)

});

