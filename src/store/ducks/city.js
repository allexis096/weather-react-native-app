export const Types = {
  ADD_RECENT_CITY: 'CITY/RECENT_CITY',
};

const INITIAL_STATE = {
  lastThreeRecents: [],
};

export default function city(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_RECENT_CITY: {
      const { cities } = action.payload;

      const repeatedCity = state.lastThreeRecents.find(
        city => city.city === cities.city
      );

      if (repeatedCity) return { ...state };

      if (state.lastThreeRecents.length === 3) {
        state.lastThreeRecents.pop();
      }

      state.lastThreeRecents.unshift(cities);

      return { ...state };
    }
    default:
      return state;
  }
}

export const Creators = {
  addRecentCity: cities => ({
    type: Types.ADD_RECENT_CITY,
    payload: {
      cities,
    },
  }),
};
