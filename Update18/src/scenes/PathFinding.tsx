import {makeScene2D, Video, Line, Circle} from '@motion-canvas/2d';
import {createRef, waitUntil, linear} from '@motion-canvas/core';

import videoMp4 from '../../video/PathFindServer.mp4'

export default makeScene2D(function* (view) {
  
  const video = createRef<Video>();

  const pathLine = createRef<Line>();

  const point = createRef<Circle>();

  view.add(
    <>
      <Video
        ref={video}
        src={videoMp4}
        play={true}
      />
      <Line
        ref={pathLine}
        points={[
          [-75, -335],
          [702, -250],
          [740, -215],
          [760, -110],
          [620, 40],
          [-170, 270],
          [-300, 240],
          [-453, -21],
        ]}
        stroke={'#00FF00'}
        opacity={0.5}
        lineWidth={5}
        radius={20}
        end={0}
      />
      <Circle
        ref={point}
        width={50}
        height={50}
        position={[-464, -43]}
        opacity={0}
        fill={'#00FF00'}
      />
    </>
  )

  yield* waitUntil('Start')

  yield* pathLine().end(1, 3, linear)
  yield* point().opacity(0.5, 0.1)

  yield* waitUntil('BotStart')

  pathLine().start(0)
  yield* pathLine().start(0.32, 2.5, linear)

  yield* waitUntil('BotStart2')

  yield* pathLine().start(1, 4.3, linear)
  yield* point().opacity(0, 0.1)

  yield* waitUntil('end')

});
