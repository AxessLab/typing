import keyBigF from '../../static/images/f_button.svg';
import keyBigJ from '../../static/images/j_button.svg';
import keyJ from '../../static/images/j_button_small.svg';
import keyH from '../../static/images/h_button.svg';
import keyK from '../../static/images/k_button.svg';
import keyL from '../../static/images/l_button.svg';
import keyÖ from '../../static/images/ö_button.svg';
import keyÄ from '../../static/images/ä_button.svg';
import keyG from '../../static/images/g_button.svg';
import keyF from '../../static/images/f_button_small.svg';
import keyD from '../../static/images/d_button.svg';
import keyS from '../../static/images/s_button.svg';
import keyA from '../../static/images/a_button.svg';
import { ITask } from '../../shared/model/task.model';

export const tasks: ITask[] = [
  {
    id: 0,
    keys: [
      { image: keyBigF, alt: 'F' },
      { image: keyBigJ, alt: 'J' }
    ],
    completed: false,
    exercise: [
      { text: 'f', correct: false },
      { text: 'j', correct: false },
      { text: 'j', correct: false },
      { text: 'f', correct: false },
      { text: 'j', correct: false },
      { text: 'j', correct: false },
      { text: 'f', correct: false },
      { text: 'f', correct: false },
      { text: 'f', correct: false },
      { text: 'j', correct: false },
      { text: 'f', correct: false },
      { text: 'f', correct: false },
      { text: 'f', correct: false },
      { text: 'j', correct: false },
      { text: 'f', correct: false }
    ]
  },
  {
    id: 1,
    keys: [
      { image: keyH, alt: 'H' },
      { image: keyJ, alt: 'J' },
      { image: keyK, alt: 'K' },
      { image: keyL, alt: 'L' },
      { image: keyÖ, alt: 'Ö' },
      { image: keyÄ, alt: 'Ä' }
    ],
    completed: false,
    exercise: [
      { text: 'ä', correct: false },
      { text: 'h', correct: false },
      { text: 'k', correct: false },
      { text: 'ä', correct: false },
      { text: 'l', correct: false },
      { text: 'ö', correct: false },
      { text: 'ä', correct: false },
      { text: 'k', correct: false },
      { text: 'l', correct: false },
      { text: 'j', correct: false },
      { text: 'ö', correct: false },
      { text: 'ä', correct: false },
      { text: 'h', correct: false },
      { text: 'j', correct: false },
      { text: 'k', correct: false }
    ]
  },
  {
    id: 2,
    keys: [
      { image: keyA, alt: 'A' },
      { image: keyS, alt: 'S' },
      { image: keyD, alt: 'D' },
      { image: keyF, alt: 'F' },
      { image: keyG, alt: 'G' }
    ],
    completed: false,
    exercise: [
      { text: 'f', correct: false },
      { text: 'g', correct: false },
      { text: 'd', correct: false },
      { text: 'a', correct: false },
      { text: 's', correct: false },
      { text: 'a', correct: false },
      { text: 's', correct: false },
      { text: 'f', correct: false },
      { text: 'g', correct: false },
      { text: 's', correct: false },
      { text: 'a', correct: false },
      { text: 'g', correct: false },
      { text: 's', correct: false },
      { text: 'a', correct: false },
      { text: 'g', correct: false }
    ]
  }
  // {
  //   id: 3,
  //   keys: [
  //     { image: keyBigF, alt: 'F' },
  //     { image: keyBigJ, alt: 'J' }
  //   ],
  //   completed: false,
  //   exercise: [
  //     { text: 'f', correct: false },
  //     { text: 'j', correct: false },
  //     { text: 'd', correct: false },
  //     { text: 'a', correct: false },
  //     { text: 's', correct: false },
  //     { text: 'a', correct: false },
  //     { text: 's', correct: false },
  //     { text: 'f', correct: false },
  //     { text: 'g', correct: false },
  //     { text: 's', correct: false },
  //     { text: 'a', correct: false },
  //     { text: 'g', correct: false },
  //     { text: 's', correct: false },
  //     { text: 'a', correct: false }
  //   ]
  // }
];
