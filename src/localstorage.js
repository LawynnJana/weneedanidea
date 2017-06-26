export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null ) {
      return undefined;
    }
    return JSON.parse(serializedState);

  } catch (err) {
    return undefined;
  }
}

export const saveState = (state) => {
  try {
    //console.log('before failure ', state.sessionStatus);
    const serializedState = JSON.stringify(state);
    //console.log('success ',serializedState);
    localStorage.setItem('state', serializedState);

  } catch(err) {
    console.log("failed");
    //log somewhere
  }
}
