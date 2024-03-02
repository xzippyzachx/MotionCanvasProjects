import {makeProject} from '@motion-canvas/core';

import PlayerControlSystem from './scenes/PlayerControlSystem?scene';
import BotDecisionSystem from './scenes/BotDecisionSystem?scene';

import audioBots2 from '../audio/Bots2.wav'; // -16 
import audioBots3 from '../audio/Bots3.wav'; // -4.85

export default makeProject({
  scenes: [BotDecisionSystem],  
  audio: audioBots3,
});
