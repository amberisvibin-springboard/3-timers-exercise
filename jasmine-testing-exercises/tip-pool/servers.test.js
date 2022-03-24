describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  it('should add an element to the server list on updateServerTable()', function () {
    let serverName = serverNameInput.value;
    serverId++;
    allServers['server' + serverId] = { serverName };

    updateServerTable();

    expect(document.getElementById("server1").innerHTML).toEqual('<td>Alice</td><td>$0.00</td><td>X</td>');
  });

  afterEach(function() {
    // teardown logic
    serverId = 0;
    allServers = {};
    serverNameInput.value = '';
    updateServerTable();
    billAmtInput.value = '';
    tipAmtInput.value = '';
  });
});
