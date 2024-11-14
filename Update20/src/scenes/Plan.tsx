import {makeScene2D, Rect, Node, Ray, Txt, is, Img, Line, Gradient} from '@motion-canvas/2d';
import {all, chain, createRef, waitUntil, easeInOutCubic, range, makeRef, waitFor, Vector2, linear} from '@motion-canvas/core';

import artSvg from '../../images/palette-solid.svg';
import saveSvg from '../../images/floppy-disk-solid.svg';
import serverSvg from '../../images/server-solid.svg';
import UISvg from '../../images/address-card-solid.svg';

export default makeScene2D(function* (view) {
  
  const creation = createRef<Node>();
  const saving = createRef<Node>();
  const networking = createRef<Node>();
  const UI = createRef<Node>();

  view.add(
    <>
      <Rect
        height={'100%'}
        width={'100%'}
        fill={'#00FF00'}
      />
    </>
  );

  view.add(
    <>
      <Node 
          ref={creation}
          x={-400}
          y={-250}
          opacity={0}
        >
          <Rect
            height={300}
            width={300}
            fill={'#1a1a1a'}
            radius={25}
          >
          </Rect>
          <Img
            src={artSvg}
            scale={1.25}
          />
        </Node>
        <Node 
          ref={saving}
          x={400}
          y={-250}
          opacity={0}
        >
          <Rect
            height={300}
            width={300}
            fill={'#1a1a1a'}
            radius={25}
          >
          </Rect>
          <Img
            src={saveSvg}
            scale={1.25}
          />
        </Node>
        <Node 
          ref={networking}
          x={-400}
          y={250}
          opacity={0}
        >
          <Rect
            height={300}
            width={300}
            fill={'#1a1a1a'}
            radius={25}
          >
          </Rect>
          <Img
            src={serverSvg}
            scale={1.25}
          />
        </Node>
        <Node 
          ref={UI}
          x={400}
          y={250}
          opacity={0}
        >
          <Rect
            height={300}
            width={300}
            fill={'#1a1a1a'}
            radius={25}
          >
          </Rect>
          <Img
            src={UISvg}
            scale={1.25}
          />
        </Node>
      </>
  )


  // Animation
  ////////////////////////////////////////

  yield* waitUntil('Start')

  yield* creation().opacity(1, easeInOutCubic(0.5))

  yield* waitFor(2.5)

  yield* saving().opacity(1, easeInOutCubic(0.5))

  yield* waitFor(3.5)

  yield* networking().opacity(1, easeInOutCubic(0.5))

  yield* waitFor(4.5)

  yield* UI().opacity(1, easeInOutCubic(0.5))

  yield* waitFor(5.5)


});

