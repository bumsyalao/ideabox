/* global expect test */
import ideas from '../../reducers/ideaReducer';
import {
  loadIdeas,
  loadUserIdeas,
  loadSearchIdeas,
  loadIdeaSuccess
} from '../../actions/ideaAction';

const initialState = {};
const state = {};
const foundIdeas = [
  {
    _id: '5a301f18dc36bd724f98165a',
    title: 'new idea for the code base',
    description:
      "``` <reactmde\n    textareaprops={{\n     id: 'description',\n     name: 'description',\n       }}\n       id=\"description\"\n       value={this.state.description}\n        onchange={this.handlevaluechange}\n        commands={reactmdecommands.getdefaultcommands()}\n />\n```",
    authorId: '5a2e998c2f5876b6b668a474',
    authorName: 'makenzi',
    category: 'computers and electronics',
    access: 'public',
    __v: 2,
    comments: ['5a3246c980a9f383d543bb60'],
    modified: true
  }
];
const metaData = {
  page: 1,
  pageCount: 1,
  pageSize: 1,
  count: 1
};
describe('load ideas reducer', () => {
  it('should dispatch found ideas when succesful', () => {
    const action = loadIdeas(foundIdeas);
    const newState = ideas(state, action);
    expect(newState.ideas[0].title).toEqual('new idea for the code base');
    expect(newState.ideas[0].category).toEqual('computers and electronics');
  });
});
describe('load user ideas reducer', () => {
  it('should dispatch found ideas when succesful', () => {
    const action = loadUserIdeas(foundIdeas);
    const newState = ideas(state, action);
    expect(newState.myIdeas[0].title).toEqual('new idea for the code base');
    expect(newState.myIdeas[0].category).toEqual('computers and electronics');
  });
});
describe('load search ideas reducer', () => {
  it('should dispatch found ideas when succesful', () => {
    const action = loadSearchIdeas(foundIdeas, metaData);
    const newState = ideas(state, action);
    expect(newState.foundIdeas[0].title).toEqual('new idea for the code base');
    expect(newState.foundIdeas[0].category).toEqual('computers and electronics');
  });
});
describe('load idea reducer', () => {
  it('should dispatch found ideas when succesful', () => {
    const action = loadIdeaSuccess(foundIdeas);
    const newState = ideas(state, action);
    expect(newState.idea[0].title).toEqual('new idea for the code base');
    expect(newState.idea[0].category).toEqual('computers and electronics');
  });
});
