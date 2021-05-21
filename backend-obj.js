[Module] {
  _Connectors: {
    ALGO: {
      appApproval: '#pragma version 3\n' +
        "// Check that we're an App\n" +
        'txn TypeEnum\n' +
        'int appl\n' +
        '==\n' +
        'assert\n' +
        'txn RekeyTo\n' +
        'global ZeroAddress\n' +
        '==\n' +
        'assert\n' +
        "// Check that everyone's here\n" +
        'global GroupSize\n' +
        'int 3\n' +
        '>=\n' +
        'assert\n' +
        '// Check txnAppl (us)\n' +
        'txn GroupIndex\n' +
        'int 0\n' +
        '==\n' +
        'assert\n' +
        '// Check txnFromHandler\n' +
        'int 0\n' +
        'gtxn 2 Sender\n' +
        'byte "{{m1}}"\n' +
        '==\n' +
        '||\n' +
        'gtxn 2 Sender\n' +
        'byte "{{m2}}"\n' +
        '==\n' +
        '||\n' +
        'gtxn 2 Sender\n' +
        'byte "{{m3}}"\n' +
        '==\n' +
        '||\n' +
        'assert\n' +
        'byte base64(cw==)\n' +
        'app_global_get\n' +
        'gtxna 0 ApplicationArgs 0\n' +
        '==\n' +
        'assert\n' +
        'byte base64(bA==)\n' +
        'app_global_get\n' +
        'gtxna 0 ApplicationArgs 5\n' +
        'btoi\n' +
        '==\n' +
        'assert\n' +
        "// Don't check anyone else, because Handler does\n" +
        '// Update state\n' +
        'byte base64(cw==)\n' +
        'gtxna 0 ApplicationArgs 1\n' +
        'app_global_put\n' +
        'byte base64(bA==)\n' +
        'global Round\n' +
        'app_global_put\n' +
        'byte base64(dg==)\n' +
        'gtxna 0 ApplicationArgs 2\n' +
        'app_global_put\n' +
        'byte base64(aA==)\n' +
        'gtxna 0 ApplicationArgs 3\n' +
        'btoi\n' +
        'app_global_put\n' +
        'byte base64(aA==)\n' +
        'app_global_get\n' +
        'bnz halted\n' +
        'txn OnCompletion\n' +
        'int NoOp\n' +
        '==\n' +
        'assert\n' +
        'b done\n' +
        'halted:\n' +
        'txn OnCompletion\n' +
        'int DeleteApplication\n' +
        '==\n' +
        'assert\n' +
        'done:\n' +
        'int 1\n' +
        'return\n',
      appApproval0: '#pragma version 3\n' +
        "// Check that we're an App\n" +
        'txn TypeEnum\n' +
        'int appl\n' +
        '==\n' +
        'assert\n' +
        'txn RekeyTo\n' +
        'global ZeroAddress\n' +
        '==\n' +
        'assert\n' +
        'txn Sender\n' +
        'byte "{{Deployer}}"\n' +
        '==\n' +
        'assert\n' +
        'txn ApplicationID\n' +
        'bz init\n' +
        'global GroupSize\n' +
        'int 2\n' +
        '==\n' +
        'assert\n' +
        'gtxn 1 TypeEnum\n' +
        'int pay\n' +
        '==\n' +
        'assert\n' +
        'gtxn 1 Amount\n' +
        'int 100000\n' +
        '==\n' +
        'assert\n' +
        "// We don't check the receiver, because we don't know it yet, because the escrow account embeds our id\n" +
        "// We don't check the sender, because we don't care... anyone is allowed to fund it. We'll give it back to the deployer, though.\n" +
        'txn OnCompletion\n' +
        'int UpdateApplication\n' +
        '==\n' +
        'assert\n' +
        'byte base64(cw==)\n' +
        '// compute state in HM_Set 0\n' +
        'int 0\n' +
        'itob\n' +
        'keccak256\n' +
        'app_global_put\n' +
        'byte base64(bA==)\n' +
        'global Round\n' +
        'app_global_put\n' +
        'byte base64(dg==)\n' +
        'byte base64()\n' +
        'app_global_put\n' +
        'byte base64(aA==)\n' +
        'int 0\n' +
        'app_global_put\n' +
        'b done\n' +
        'init:\n' +
        'global GroupSize\n' +
        'int 1\n' +
        '==\n' +
        'assert\n' +
        'txn OnCompletion\n' +
        'int NoOp\n' +
        '==\n' +
        'assert\n' +
        'done:\n' +
        'int 1\n' +
        'return\n',
      appClear: '#pragma version 3\n' +
        "// We're alone\n" +
        'global GroupSize\n' +
        'int 1\n' +
        '==\n' +
        'assert\n' +
        "// We're halted\n" +
        'byte base64(aA==)\n' +
        'app_global_get\n' +
        'int 1\n' +
        '==\n' +
        'assert\n' +
        'done:\n' +
        'int 1\n' +
        'return\n',
      ctc: '#pragma version 3\n' +
        '// Check size\n' +
        'global GroupSize\n' +
        'int 3\n' +
        '>=\n' +
        'assert\n' +
        '// Check txnAppl\n' +
        'gtxn 0 TypeEnum\n' +
        'int appl\n' +
        '==\n' +
        'assert\n' +
        'gtxn 0 ApplicationID\n' +
        'byte "{{ApplicationID}}"\n' +
        'btoi\n' +
        '==\n' +
        'assert\n' +
        "// Don't check anything else, because app does\n" +
        '// Check us\n' +
        'txn TypeEnum\n' +
        'int pay\n' +
        '==\n' +
        'int axfer\n' +
        'dup2\n' +
        '==\n' +
        '||\n' +
        'assert\n' +
        'txn RekeyTo\n' +
        'global ZeroAddress\n' +
        '==\n' +
        'assert\n' +
        'txn GroupIndex\n' +
        'int 3\n' +
        '>=\n' +
        'assert\n' +
        'done:\n' +
        'int 1\n' +
        'return\n',
      stepargs: [Array],
      steps: [Array],
      unsupported: false
    },
    ETH: {
      ABI: '[\n' +
        '  {\n' +
        '    "inputs": [],\n' +
        '    "stateMutability": "payable",\n' +
        '    "type": "constructor"\n' +
        '  },\n' +
        '  {\n' +
        '    "anonymous": false,\n' +
        '    "inputs": [],\n' +
        '    "name": "e0",\n' +
        '    "type": "event"\n' +
        '  },\n' +
        '  {\n' +
        '    "anonymous": false,\n' +
        '    "inputs": [\n' +
        '      {\n' +
        '        "components": [\n' +
        '          {\n' +
        '            "components": [\n' +
        '              {\n' +
        '                "internalType": "uint256",\n' +
        '                "name": "v22",\n' +
        '                "type": "uint256"\n' +
        '              }\n' +
        '            ],\n' +
        '            "internalType": "struct T0",\n' +
        '            "name": "svs",\n' +
        '            "type": "tuple"\n' +
        '          },\n' +
        '          {\n' +
        '            "components": [\n' +
        '              {\n' +
        '                "internalType": "uint256",\n' +
        '                "name": "v27",\n' +
        '                "type": "uint256"\n' +
        '              }\n' +
        '            ],\n' +
        '            "internalType": "struct T2",\n' +
        '            "name": "msg",\n' +
        '            "type": "tuple"\n' +
        '          }\n' +
        '        ],\n' +
        '        "indexed": false,\n' +
        '        "internalType": "struct T3",\n' +
        '        "name": "_a",\n' +
        '        "type": "tuple"\n' +
        '      }\n' +
        '    ],\n' +
        '    "name": "e1",\n' +
        '    "type": "event"\n' +
        '  },\n' +
        '  {\n' +
        '    "anonymous": false,\n' +
        '    "inputs": [\n' +
        '      {\n' +
        '        "components": [\n' +
        '          {\n' +
        '            "components": [\n' +
        '              {\n' +
        '                "internalType": "address payable",\n' +
        '                "name": "v26",\n' +
        '                "type": "address"\n' +
        '              },\n' +
        '              {\n' +
        '                "internalType": "uint256",\n' +
        '                "name": "v27",\n' +
        '                "type": "uint256"\n' +
        '              },\n' +
        '              {\n' +
        '                "internalType": "uint256",\n' +
        '                "name": "v30",\n' +
        '                "type": "uint256"\n' +
        '              }\n' +
        '            ],\n' +
        '            "internalType": "struct T1",\n' +
        '            "name": "svs",\n' +
        '            "type": "tuple"\n' +
        '          },\n' +
        '          {\n' +
        '            "internalType": "bool",\n' +
        '            "name": "msg",\n' +
        '            "type": "bool"\n' +
        '          }\n' +
        '        ],\n' +
        '        "indexed": false,\n' +
        '        "internalType": "struct T5",\n' +
        '        "name": "_a",\n' +
        '        "type": "tuple"\n' +
        '      }\n' +
        '    ],\n' +
        '    "name": "e2",\n' +
        '    "type": "event"\n' +
        '  },\n' +
        '  {\n' +
        '    "anonymous": false,\n' +
        '    "inputs": [\n' +
        '      {\n' +
        '        "components": [\n' +
        '          {\n' +
        '            "components": [\n' +
        '              {\n' +
        '                "internalType": "address payable",\n' +
        '                "name": "v26",\n' +
        '                "type": "address"\n' +
        '              },\n' +
        '              {\n' +
        '                "internalType": "uint256",\n' +
        '                "name": "v27",\n' +
        '                "type": "uint256"\n' +
        '              },\n' +
        '              {\n' +
        '                "internalType": "uint256",\n' +
        '                "name": "v30",\n' +
        '                "type": "uint256"\n' +
        '              }\n' +
        '            ],\n' +
        '            "internalType": "struct T1",\n' +
        '            "name": "svs",\n' +
        '            "type": "tuple"\n' +
        '          },\n' +
        '          {\n' +
        '            "internalType": "bool",\n' +
        '            "name": "msg",\n' +
        '            "type": "bool"\n' +
        '          }\n' +
        '        ],\n' +
        '        "indexed": false,\n' +
        '        "internalType": "struct T5",\n' +
        '        "name": "_a",\n' +
        '        "type": "tuple"\n' +
        '      }\n' +
        '    ],\n' +
        '    "name": "e3",\n' +
        '    "type": "event"\n' +
        '  },\n' +
        '  {\n' +
        '    "inputs": [\n' +
        '      {\n' +
        '        "components": [\n' +
        '          {\n' +
        '            "components": [\n' +
        '              {\n' +
        '                "internalType": "uint256",\n' +
        '                "name": "v22",\n' +
        '                "type": "uint256"\n' +
        '              }\n' +
        '            ],\n' +
        '            "internalType": "struct T0",\n' +
        '            "name": "svs",\n' +
        '            "type": "tuple"\n' +
        '          },\n' +
        '          {\n' +
        '            "components": [\n' +
        '              {\n' +
        '                "internalType": "uint256",\n' +
        '                "name": "v27",\n' +
        '                "type": "uint256"\n' +
        '              }\n' +
        '            ],\n' +
        '            "internalType": "struct T2",\n' +
        '            "name": "msg",\n' +
        '            "type": "tuple"\n' +
        '          }\n' +
        '        ],\n' +
        '        "internalType": "struct T3",\n' +
        '        "name": "_a",\n' +
        '        "type": "tuple"\n' +
        '      }\n' +
        '    ],\n' +
        '    "name": "m1",\n' +
        '    "outputs": [],\n' +
        '    "stateMutability": "payable",\n' +
        '    "type": "function"\n' +
        '  },\n' +
        '  {\n' +
        '    "inputs": [\n' +
        '      {\n' +
        '        "components": [\n' +
        '          {\n' +
        '            "components": [\n' +
        '              {\n' +
        '                "internalType": "address payable",\n' +
        '                "name": "v26",\n' +
        '                "type": "address"\n' +
        '              },\n' +
        '              {\n' +
        '                "internalType": "uint256",\n' +
        '                "name": "v27",\n' +
        '                "type": "uint256"\n' +
        '              },\n' +
        '              {\n' +
        '                "internalType": "uint256",\n' +
        '                "name": "v30",\n' +
        '                "type": "uint256"\n' +
        '              }\n' +
        '            ],\n' +
        '            "internalType": "struct T1",\n' +
        '            "name": "svs",\n' +
        '            "type": "tuple"\n' +
        '          },\n' +
        '          {\n' +
        '            "internalType": "bool",\n' +
        '            "name": "msg",\n' +
        '            "type": "bool"\n' +
        '          }\n' +
        '        ],\n' +
        '        "internalType": "struct T5",\n' +
        '        "name": "_a",\n' +
        '        "type": "tuple"\n' +
        '      }\n' +
        '    ],\n' +
        '    "name": "m2",\n' +
        '    "outputs": [],\n' +
        '    "stateMutability": "payable",\n' +
        '    "type": "function"\n' +
        '  },\n' +
        '  {\n' +
        '    "inputs": [\n' +
        '      {\n' +
        '        "components": [\n' +
        '          {\n' +
        '            "components": [\n' +
        '              {\n' +
        '                "internalType": "address payable",\n' +
        '                "name": "v26",\n' +
        '                "type": "address"\n' +
        '              },\n' +
        '              {\n' +
        '                "internalType": "uint256",\n' +
        '                "name": "v27",\n' +
        '                "type": "uint256"\n' +
        '              },\n' +
        '              {\n' +
        '                "internalType": "uint256",\n' +
        '                "name": "v30",\n' +
        '                "type": "uint256"\n' +
        '              }\n' +
        '            ],\n' +
        '            "internalType": "struct T1",\n' +
        '            "name": "svs",\n' +
        '            "type": "tuple"\n' +
        '          },\n' +
        '          {\n' +
        '            "internalType": "bool",\n' +
        '            "name": "msg",\n' +
        '            "type": "bool"\n' +
        '          }\n' +
        '        ],\n' +
        '        "internalType": "struct T5",\n' +
        '        "name": "_a",\n' +
        '        "type": "tuple"\n' +
        '      }\n' +
        '    ],\n' +
        '    "name": "m3",\n' +
        '    "outputs": [],\n' +
        '    "stateMutability": "payable",\n' +
        '    "type": "function"\n' +
        '  },\n' +
        '  {\n' +
        '    "stateMutability": "payable",\n' +
        '    "type": "receive"\n' +
        '  }\n' +
        ']',
      Bytecode: '0x608060408190527f49ff028a829527a47ec6839c7147b484eccf5a2a94853eddac09cef44d9d4e9e90600090a160408051602080820183524382528251808201845260008082529251815283518083018490529051818501528351808203850181526060909101909352825192019190912090556104de806100826000396000f3fe6080604052600436106100385760003560e01c80632438df70146100445780639532ef0114610059578063e163d7c41461006c5761003f565b3661003f57005b600080fd5b6100576100523660046103dd565b61007f565b005b6100576100673660046103c6565b610176565b61005761007a3660046103dd565b61028c565b604051610093906001908390602001610447565b6040516020818303038152906040528051906020012060001c600054146100b957600080fd5b600080556100cc600a604083013561045b565b43106100d757600080fd5b346020820135146100e757600080fd5b6100f460208201826103a5565b6001600160a01b03166108fc61010f60208401356002610473565b6040518115909202916000818181858888f19350505050158015610137573d6000803e3d6000fd5b507f1ca594b20641191c893d80895212a20239e99e17b7304a35c096140ec34f22dd816040516101679190610417565b60405180910390a16000805533ff5b60408051600060208201528235918101919091526060016040516020818303038152906040528051906020012060001c600054146101b357600080fd5b60008055346020820135146101c757600080fd5b6040805182358152602080840135908201527ff2c62eba998811305a23599b2e6d212befbd7ded3a73f4c08bfb9aefe08dc166910160405180910390a1610231604051806060016040528060006001600160a01b0316815260200160008152602001600081525090565b338152602091820135828201908152436040808401918252805160018187015293516001600160a01b03168482015291516060840152516080808401919091528151808403909101815260a090920190528051910120600055565b6040516102a0906001908390602001610447565b6040516020818303038152906040528051906020012060001c600054146102c657600080fd5b600080556102d9600a604083013561045b565b4310156102e557600080fd5b34156102f057600080fd5b336102fe60208301836103a5565b6001600160a01b03161461031157600080fd5b61031e60208201826103a5565b6040516001600160a01b039190911690602083013580156108fc02916000818181858888f19350505050158015610359573d6000803e3d6000fd5b507fc3d6ba703f6ce931b1dd0e05e983d8be7c8ccc7f15219d844425151d85623013816040516101679190610417565b80356001600160a01b03811681146103a057600080fd5b919050565b6000602082840312156103b6578081fd5b6103bf82610389565b9392505050565b6000604082840312156103d7578081fd5b50919050565b6000608082840312156103d7578081fd5b6001600160a01b036103ff82610389565b16825260208181013590830152604090810135910152565b6080810161042582846103ee565b606083013580151580821461043957600080fd5b806060850152505092915050565b828152608081016103bf60208301846103ee565b6000821982111561046e5761046e610492565b500190565b600081600019048311821515161561048d5761048d610492565b500290565b634e487b7160e01b600052601160045260246000fdfea2646970667358221220e417e0ff34eebc2f80d1d1e8a65745590afc9bb7211658d4b25afa0ea9dea69564736f6c63430008020033',
      deployMode: 'DM_constructor',
      views: {}
    }
  },
  _getViews: [Function: _getViews],
  _version: '0.1.2',
  attacher: [AsyncFunction: attacher],
  deployer: [AsyncFunction: deployer],
  getExports: [Function: getExports]
}