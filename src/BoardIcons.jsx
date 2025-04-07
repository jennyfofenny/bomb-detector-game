import mine from './img/mine.png';
import nomine from './img/nomine.png';
import flag from './img/flag.png';
import one from './img/one.png';
import two from './img/two.png';
import three from './img/three.png';
import four from './img/four.png';
import five from './img/five.png';
import six from './img/six.png';
import seven from './img/seven.png';
import eight from './img/eight.png';
import question from './img/question.png';
import { USER_TAGS } from './GameConstants';

export const BoardIcon = ({ mine, hidden, adjacentMines, userTag, end }) => {
  if (!hidden) {
    if (mine) return <Mine />;
    if (end && !mine && userTag === USER_TAGS.FLAG) return <NoMine />;
    if (adjacentMines > 0) return <AdjacentMines adjacentMines={adjacentMines} />;
    return null;
  }

  switch (userTag) {
    case USER_TAGS.FLAG:
      return <Flag />;
    case USER_TAGS.QUESTION:
      return <Question />;
    default:
      return null;
  }
}

export const Mine = () => {
  return (
    <img src={mine} alt="Mine" />
  );
};

export const NoMine = () => {
  return (
    <img src={nomine} alt="No mine" />
  );
};

export const Flag = () => <img src={flag} alt="Flag" />;

export const Question = () => <img src={question} alt="Question" />;

export const AdjacentMines = ({ adjacentMines }) => {
  switch (adjacentMines) {
    case 1:
      return <img src={one} alt="1" />;
    case 2:
      return <img src={two} alt="2" />;
    case 3: 
      return <img src={three} alt="3" />;
    case 4: 
      return <img src={four} alt="4" />;
    case 5: 
      return <img src={five} alt="5" />;
    case 6: 
      return <img src={six} alt="6" />;
    case 7: 
      return <img src={seven} alt="7" />;
    case 8: 
      return <img src={eight} alt="8" />;
    default: 
      return null;
  }
}