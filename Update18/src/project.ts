import {makeProject} from '@motion-canvas/core';

import PlayerControlSystem from './scenes/PlayerControlSystem?scene';

import audio from '../audio/Bots2.wav';

export default makeProject({
  scenes: [PlayerControlSystem],
  audio: audio,
});
