export const daysOfTheWeek = {
    days: ({ count }) => {
      const days = [];
      for (let i = 0; i < count; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        days.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
      }
      return days.reverse();
    },
  };