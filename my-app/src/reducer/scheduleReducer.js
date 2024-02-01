import {
  GOTO_TODAY,
  PREV_MONTH,
  NEXT_MONTH,
  PREV_WEEK,
  NEXT_WEEK,
  DATE_CLICK,
  SET_DATE,
} from "../actions/scheduleActions"

export const initialState = {
  today: new Date(),
  clicked: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
  },
  weekData: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
  },
  prevDate: new Date(),
  day: ["일", "월", "화", "수", "목", "금", "토"],
  get days() {
    const isLeapYear = this.weekData.year % 4 === 0;
    return [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  },
};

const scheduleReducer = (state, action) => {
  switch (action.type) {
    case GOTO_TODAY:
      return {
        ...state,
        weekData: {
          year: state.today.getFullYear(),
          month: state.today.getMonth() + 1,
          date: state.today.getDate(),
        },
        clicked: {
          year: state.today.getFullYear(),
          month: state.today.getMonth() + 1,
          date: state.today.getDate(),
        },
      };
    case PREV_MONTH:
      if (state.weekData.month === 1) {
        return {
          ...state,
          weekData: {
            year: state.weekData.year - 1,
            month: 12,
            date: state.days[11],
          },
          days: (state.weekData.year - 1) % 4 === 0
            ? [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
            : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        }
      }
      else {
        return {
          ...state,
          weekData: {
            year: state.weekData.year,
            month: state.weekData.month - 1,
            date: state.days[state.weekData.month - 2],
          }
        }
      }
    case NEXT_MONTH:
      if (state.weekData.month === 12) {
        return {
          ...state,
          weekData: {
            year: state.weekData.year + 1,
            month: 1,
            date: 1,
          },
          days: (state.weekData.year + 1) % 4 === 0
            ? [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
            : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        }
      }
      else {
        return {
          ...state,
          weekData: {
            year: state.weekData.year,
            month: state.weekData.month + 1,
            date: 1,
          }
        }
      }
    case PREV_WEEK:
      return {
        ...state,
        weekData: {
          ...state.weekData,
          date: new Date(state.weekData.year, state.weekData.month - 1, state.weekData.date - (new Date(state.weekData.year, state.weekData.month - 1, state.weekData.date).getDay() + 1)).getDate(),
        }
      };
    case NEXT_WEEK:
      return {
        ...state,
        weekData: {
          ...state.weekData,
          date: new Date(state.weekData.year, state.weekData.month - 1, state.weekData.date + (-new Date(state.weekData.year, state.weekData.month - 1, state.weekData.date).getDay() + 7)).getDate(),
        }
      };
    case DATE_CLICK:
      return {
        ...state,
        clicked: {
          year: action.year,
          month: action.month,
          date: action.date,
        },
        prevDate: new Date(state.clicked.year, state.clicked.month - 1, state.clicked.date),
      };
    case SET_DATE:
      return {
        ...state,
        clicked: {
          year: action.year,
          month: action.month,
          date: action.date,
        },
        weekData: {
          year: action.year,
          month: action.month,
          date: action.date,
        },
        prevDate: new Date(),
      };
    default:
      return null;
  }
};

export default scheduleReducer;