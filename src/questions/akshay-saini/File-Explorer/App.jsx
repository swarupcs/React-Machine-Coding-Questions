// Nested File Folder Structure
// Add/ Remove File/Folder
// Expand and collapse the folder

import { useState } from 'react';
import './App.css';
import json from './data.json';

const List = ({ list, addNodeToList, deleteNodeFromList }) => {
  const [isExpanded, setIsExpanded] = useState({});
  return (
    <div className='container'>
      {list.map((node) => (
        <div key={node.id}>
          {node?.isFolder && (
            <span
              key={node.id}
              onClick={() =>
                setIsExpanded((prev) => ({
                  ...prev,
                  [node.name]: !prev[node.name],
                }))
              }
            >
              {isExpanded?.[node.name] ? '-' : '+'}
            </span>
          )}
          <span key={node.id}>{node.name}</span>
          {node?.isFolder && (
            <span onClick={() => addNodeToList(node.id)}>
              <img
                src='https://static.vecteezy.com/system/resources/previews/041/444/303/non_2x/new-folder-icon-symbol-design-illustration-vector.jpg'
                alt='icon'
                className='icon'
              />
            </span>
          )}
          <span onClick={() => deleteNodeFromList(node.id)}>
            <img
              src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALYAAACUCAMAAAAJSiMLAAAAYFBMVEX///8AAAD5+flwcHA3Nzfr6+tjY2N3d3dbW1tISEgtLS3Nzc2fn5/ExMQ/Pz+np6cbGxvZ2dm+vr4gICAPDw+RkZHy8vLh4eGGhoaysrJ+fn4mJiZra2uXl5cUFBRPT09jlXETAAADUUlEQVR4nO3a6ZaiMBAF4AZlEURFJAEFef+3HMehAi06WYCk+5x7/8ryCUgqFb++5sZneRUf7p5SToewzJk/+6Szk15PauIhSZU6RudVoYt+wkvuUp0dTNB/0zm84EdT9COX+jeqHzm7Uafz1J6Xu1Dz3Vx2HDhgt2PBriqVcv32G97bV6fJYNZ6SuvhLh3sPybiYl+uTG/PYCPcx3Vsn8PE3b5qD9VMuGPNbzw7nM7cGfyuuPjOtn+U+1n3WTxhtsecqD/vyeg2cyoY26VdknT9ebdmu1MBFi2rkubWnzc0250e7t2yKmku/Xk3Zrvv5t0s44BtM7+UfZ/HphfRYVnVvwR5vY/idwlpvCjCt59LEtK0+f5+92hf56YDaNrOrqjnpNub1Ie8SuSHXjfbSvuKm8/Jl8xOb37vt/JD2onWBOjHqLUqzNq1dZxMVZ1vXVPH2Sn23YY50yP329ZBinEDV3HWl13EHt2RO2nq+nw/jBmF0uvEr2j7i/57c7nwSLhblUsXiM3L1W3/i38Vl1vl6mW0tfVuwEsCqrc8lR8lPSMXRx3RIaKjqzJRplLktjpLloAmyioTVvqKq5TCekk0KMRuVldJQy/BRGFbMTqtrpKGrnahsC2N7O6fbUbNmFhhY3rN35VrmLUiKjqVAUQ0JTeOF2uZmLCqvIpFC9h+0/x7SgFRGSWHL+m1DsfJYFCrlYCjScIm48x3EMbPjUAoDtdBPLhPXbNxkKYbimevUbzn9Wgf9zkp10aV/GD2orHgEMuPZis6NUbQyI9nJ5HWy4xF8iPaSKU75GU/oOuwNfmvTBne5EdeL0lo+E8CltL0ImlCS2mo831LzYdoKng3LLAUtsTyCLEtrnqCDbY0YIMtDdhgS2OHzeuqzd5Vl0Fdlud3ZQWr27L+3EKwws6frfNyyuPPicZ1ygueM77wY6fdBpt6KpMSk1Ywqsku/Urtx5aXDXbWV+Th61VN+0nGZFGR9ysbH2cANtjUL5zozv3C4u21/5nS1ONTp84me/LX4HPfaikm7BPYYIMNNthggw022GCDDTbYYIMNNthggw022GCDDTbYYIMNNthggw022GCDDTbYYIMNNthggw022GCDDTbYYIMNNthga7H/AOYddd6EmhfOAAAAAElFTkSuQmCC'
              alt='delete'
              className='icon'
            />
          </span>
          {isExpanded?.[node.name] && node?.isFolder && (
            <List list={node.children} />
          )}
        </div>
      ))}
    </div>
  );
};

function App() {
  const [data, setData] = useState(json);

  const addNodeToList = (parentId) => {
    const name = prompt('Enter the name');
    const updateTree = (list) => {
      return list.map((node) => {
        if (node.id === parentId) {
          return {
            ...node,
            children: [
              ...node.children,
              { id: Date.now(), name: name, isFolder: true, children: [] },
            ],
          };
        }
        if (node.children) {
          return {
            ...node,
            children: updateTree(node.children),
          };
        }
        return node;
      });
    };

    setData((prev) => updateTree(prev));
  };


  const deleteNodeFromList = (itemId) => {

    const updateTree = (list) => {
      return list.filter((node) => node.id !== itemId).map((node) => {
        if (node.children) {
          return {
            ...node,
            children: updateTree(node.children),
          };
        }
        return node;
      });
    };
    
    setData((prev) => updateTree(prev));
    
  }

  return (
    <>
      <h1>File Explorer</h1>
      <div className='container'>
        <List list={data} addNodeToList={addNodeToList} deleteNodeFromList={deleteNodeFromList} />
      </div>
    </>
  );
}

export default App;
