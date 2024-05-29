// boardActions.js

export const deleteBoard = (boardId) => {
    return {
      type: 'DELETE_BOARD',
      payload: boardId
    };
  };
  