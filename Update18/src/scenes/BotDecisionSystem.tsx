import {makeScene2D, Rect, Node, Ray, Txt, is, Img, Line, Gradient} from '@motion-canvas/2d';
import {all, chain, createRef, waitUntil, easeInOutCubic, range, makeRef, waitFor, Vector2, linear} from '@motion-canvas/core';


export default makeScene2D(function* (view) {
  
  const idleState = <Node x={-450} y={200} opacity={0}/>
  const combatState = <Node x={0} y={-200} opacity={0}/>
  const patrolState = <Node x={450} y={200} opacity={0}/>
  const baseState = <Node x={0} y={-250} opacity={0}/>

  const idleCombatLine = createRef<Line>();
  const idlePatrolLine = createRef<Line>();
  const combatPatrolLine = createRef<Line>();

  const idleLine = createRef<Line>();
  const combatLine = createRef<Line>();
  const patrolLine = createRef<Line>();

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
      <Line
        ref={idleCombatLine}
        points={[
          [-450, 125],
          [-450, -200],
          [-200, -200],
        ]}
        stroke={'#FFFFFF'}
        endArrow
        lineWidth={15}
        radius={20}
        end={0}
      />
      <Line
        ref={idlePatrolLine}
        points={[
          [250, 200],
          [-250, 200],
        ]}
        stroke={'#FFFFFF'}
        endArrow
        lineWidth={15}
        radius={20}
        end={0}
      />
      <Line
        ref={combatPatrolLine}
        points={[
          [200, -200],
          [450, -200],
          [450, 125],
        ]}
        stroke={'#FFFFFF'}
        endArrow
        lineWidth={15}
        radius={20}
        end={0}
      />
      <Line
        ref={idleLine}
        points={[
          [0, -175],
          [0, 0],
          [-500, 0],
          [-500, 175],
        ]}
        stroke={'#FFFFFF'}
        startArrow
        lineWidth={15}
        radius={20}
        end={0}
      />
      <Line
        ref={combatLine}
        points={[
          [0, -175],
          [0, 175],
        ]}
        stroke={'#FFFFFF'}
        startArrow
        lineWidth={15}
        radius={20}
        end={0}
      />
      <Line
        ref={patrolLine}
        points={[
          [0, -175],
          [0, 0],
          [500, 0],
          [500, 175],
        ]}
        stroke={'#FFFFFF'}
        startArrow
        lineWidth={15}
        radius={20}
        end={0}
      />
    </>
  );

  idleState.add(
    <>
      <Rect
        height={150}
        width={400}
        radius={20}
        fill={'#3a3e44'}
        opacity={1}
      />
      <Txt
        text={'State'}
        fill={'#FFFFFF'}
        fontWeight={800}
        y={6}
        opacity={1}
      />
    </>
  );

  combatState.add(
    <>
      <Rect
        height={150}
        width={400}
        radius={20}
        fill={'#3a3e44'}
        opacity={1}
      />
      <Txt
        text={'State'}
        fill={'#FFFFFF'}
        fontWeight={800}
        y={6}
        opacity={1}
      />
    </>
  );

  patrolState.add(
    <>
      <Rect
        height={150}
        width={400}
        radius={20}
        fill={'#3a3e44'}
        opacity={1}
      />
      <Txt
        text={'State'}
        fill={'#FFFFFF'}
        fontWeight={800}
        y={6}
        opacity={1}
      />
    </>
  );

  baseState.add(
    <>
      <Rect
        height={150}
        width={400}
        radius={20}
        fill={'#3a3e44'}
        opacity={1}
      />
      <Txt
        text={'BaseState'}
        fill={'#FFFFFF'}
        fontWeight={800}
        y={6}
        opacity={1}
      />
    </>
  );

  view.add(idleState);
  view.add(combatState);
  view.add(patrolState);
  view.add(baseState);

  // Animation
  ////////////////////////////////////////

  yield* waitUntil('Start')

  yield* all(
    idleState.opacity(1, 0.5),
    combatState.opacity(1, 0.5),
    patrolState.opacity(1, 0.5),
  );
  
  yield* idleState.findFirst(is(Rect)).fill('#676e79', 0.25)

  yield* waitFor(1)
  
  yield* idleCombatLine().end(1, 0.5)
  yield* all(
    idleState.findFirst(is(Rect)).fill('#3a3e44', 0.25),
    combatState.findFirst(is(Rect)).fill('#676e79', 0.25),
  );
  yield* idleCombatLine().start(1, 0.5)

  yield* combatPatrolLine().end(1, 0.5)
  yield* all(
    combatState.findFirst(is(Rect)).fill('#3a3e44', 0.25),
    patrolState.findFirst(is(Rect)).fill('#676e79', 0.25),
  );
  yield* combatPatrolLine().start(1, 0.5)

  yield* idlePatrolLine().end(1, 0.5)
  yield* all(
    patrolState.findFirst(is(Rect)).fill('#3a3e44', 0.25),
    idleState.findFirst(is(Rect)).fill('#676e79', 0.25),
  );
  yield* idlePatrolLine().start(1, 0.5)

  idleCombatLine().end(0)
  idleCombatLine().start(0)
  yield* idleCombatLine().end(1, 0.5)
  yield* all(
    idleState.findFirst(is(Rect)).fill('#3a3e44', 0.25),
    combatState.findFirst(is(Rect)).fill('#676e79', 0.25),
  );
  yield* idleCombatLine().start(1, 0.5)

  yield* waitUntil('States')

  yield* all(
    idleState.findFirst(is(Txt)).text("Idle", 0.5),
    combatState.findFirst(is(Txt)).text("Combat", 0.5),
    patrolState.findFirst(is(Txt)).text("Patrol", 0.5),
    idleState.findFirst(is(Rect)).fill('#676e79', 0.25),
    combatState.findFirst(is(Rect)).fill('#3a3e44', 0.25),
  );

  yield* waitUntil('Combat')

  idleCombatLine().end(0)
  idleCombatLine().start(0)
  yield* idleCombatLine().end(1, 0.5)
  yield* all(
    idleState.findFirst(is(Rect)).fill('#3a3e44', 0.25),
    combatState.findFirst(is(Rect)).fill('#676e79', 0.25),
  );
  yield* idleCombatLine().start(1, 0.5)

  yield* waitUntil('Idle')
  
  idleCombatLine().startArrow(true)
  idleCombatLine().endArrow(false)
  yield* idleCombatLine().end(0, 0.5)
  yield* all(
    idleState.findFirst(is(Rect)).fill('#676e79', 0.25),
    combatState.findFirst(is(Rect)).fill('#3a3e44', 0.25),
  );
  yield* idleCombatLine().start(0, 0.5)

  yield* waitUntil('Patrol')

  idlePatrolLine().startArrow(true)
  idlePatrolLine().endArrow(false)
  yield* idlePatrolLine().end(0, 0.5)
  yield* all(
    patrolState.findFirst(is(Rect)).fill('#676e79', 0.25),
    idleState.findFirst(is(Rect)).fill('#3a3e44', 0.25),
  );
  yield* idlePatrolLine().start(0, 0.5)

  yield* waitFor(0.5)

  yield* patrolState.findFirst(is(Rect)).fill('#3a3e44', 0.25),

  yield* waitUntil('OOP')

  yield* all(
    idleState.position([-500, 250], 0.5),
    combatState.position([0, 250], 0.5),
    patrolState.position([500, 250], 0.5),
    idleState.findFirst(is(Txt)).text("IdleState", 0.5),
    combatState.findFirst(is(Txt)).text("CombatState", 0.5),
    patrolState.findFirst(is(Txt)).text("PatrolState", 0.5),
    baseState.opacity(1, 0.5),
  );

  yield* waitFor(0.75)

  yield* all(
    idleLine().end(1, 0.5),
    combatLine().end(1, 0.5),
    patrolLine().end(1, 0.5),
  );

  yield* waitUntil('Flash')

  yield* idleState.findFirst(is(Rect)).fill('#676e79', 0.25)
  yield* all(
    idleState.findFirst(is(Rect)).fill('#3a3e44', 0.25),
    combatState.findFirst(is(Rect)).fill('#676e79', 0.25),
  );
  yield* all(
    combatState.findFirst(is(Rect)).fill('#3a3e44', 0.25),
    patrolState.findFirst(is(Rect)).fill('#676e79', 0.25),
  );
  yield* patrolState.findFirst(is(Rect)).fill('#3a3e44', 0.25)


  yield* waitUntil('Patrol2')
  yield* all(
    idleState.opacity(0, 0.5),
    combatState.opacity(0, 0.5),
    baseState.opacity(0, 0.5),

    idleLine().opacity(0, 0.5),
    combatLine().opacity(0, 0.5),
    patrolLine().opacity(0, 0.5),
  );

  yield* patrolState.position([0, 0], 0.5),

  yield* waitUntil('End')

});

