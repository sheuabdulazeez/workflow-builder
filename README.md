## Node Explanation

Every node needs to take in the same params structure. 

#### Node Choices

When seniding a request for choices, we neeed to send a structure like below:  Gotten from Zapier

```json
{
  "node": "gmail",
  "authenticationId": 45309606,
  "params": {
    "body_type": "html",
    "to": ["hewhke"],
    "body": "",
    "file": [],
    "cc": ["wel"]
  },
  "field": "from",
  "page": 0,
  "workflowId": "jn748r81zjpd964xhwt4mwtbb16rpdaa",
}
```

### Todo Day 7

- Add Events to the node description (Gmail, Sheet, Webhook, Client, Task)
- Get the Node to the frontend with filtering based on the node type (trigger | action)
- Map out the structure for the workflow database. Sample:

  ```json

  {
      nodes: [{
          id: "",
          type: "trigger",
          data: {
              api: "gmail",
              event: "sendEmail",
              authenticationId: "",
              params: {}
          }
      }],
      connections: [],
      title: "",
      active: true

  }
  ```
- Add the plus button to the node on the frontend so we can add more nodes
