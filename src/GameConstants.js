export const USER_TAGS = {
  'FLAG': 'flag', 
  'QUESTION': 'question', 
  'EMPTY': 'empty' 
};

export const BOARD_ACTION = {
  'SELECT': 'Select',
  'FLAG': 'Flag',
  'MOUSEDOWN': 'Mousedown',
  'MOUSEUP': 'Mouseup',
  'NEW': 'New',
  'LEVEL': 'Level'
};

export const GAME_STATUS = {
  'HAPPY': 'Happy',
  'NERVOUS': 'Nervous',
  'WIN': 'Win',
  'LOSE': 'Lose'
};

export const SKILL_LEVELS = {
  'BEGINNER': 'Beginner',
  'INTERMEDIATE': 'Intermediate',
  'EXPERT': 'Expert',
  'CUSTOM': 'Custom'
};

export const LEVEL_CONFIG= {
  'BEGINNER': {
    mines: 10,
    width: 9,
    height: 9
  },
  'INTERMEDIATE': {
    mines: 40,
    width: 16,
    height: 16
  },
  'EXPERT': {
    mines: 99,
    width: 30,
    height: 16
  }
};

export const START_ACTIONS = [ BOARD_ACTION.SELECT, BOARD_ACTION.FLAG ];
