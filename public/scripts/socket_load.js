var socket = io("http://192.168.56.101:3000");
var ebc     = new BigNumber(1e+18);
function formatEBC(balance) {
    var ret = new BigNumber(balance.toString());
    return ret.dividedBy(ebc) + " EBC";
}

socket.on("update-lastest-block",function (data) {
    var blocks = data.blocks;
    var tx = data.txs;
    var htmlContentTbody = "";
    jQuery.each( blocks, function( i, val ) {
        var dateonblock = moment.unix(val.timestamp).format();
        htmlContentTbody+="<tr>"
                          +"<td><a href='/block/"+val.number+"'>"+ val.number +"</a> </td>"
                          +"<td><a href='/account/"+val.author+"'>"+ val.author +"</a></td>"
                          +"<td>"+dateonblock+"</td>"
                          +"<td>"+val.transactions.length+"</td>"
                          +"<td>"+val.uncles.length+"</td>"
                          +"</tr>";
    });
    $('#ind_tbody').html(htmlContentTbody);
    var htmlTransactionList = "";
    if(tx.length == 0){
        htmlTransactionList ="<p>No transactions during the last 10 blocks</p>";
    }else{
        htmlTransactionList+="<table class='table'>" +
            "<thead>" +
            "<tr>" +
            "<th> Hash" +
            "</th>" +
            "<th> From" +
            "</th>" +
            "<th> To" +
            "</th>" +
            "<th> Amount" +
            "</th>" +
            "</tr>" +
            "</thead>";
        jQuery.each(tx,function (i,val) {
            htmlTransactionList+=
                "<tbody>" +
                "<tr>" +
                    "<td>" +
                    "<a href='/tx/"+val.hash+"'>"+val.hash.substr(0,10)+"...</a>" +
                    "</td>" +
                    "<td>" +
                    "<a href='/account/"+val.from+"'>"+ val.from +"</a>" +
                    "</td>" +
                    "<td> " +
                    "<a href='/account/"+val.to+"'>"+ val.to +"</a>" +
                    "</td>" +
                    "<td>"  +
                    formatEBC(val.value)+
                    "</td>" +
                "</tr>" +
                "</tbody>"+
                "</table>";

        })
    }
    $('#recent_trans').html(htmlTransactionList);


    /*
    if txs.length === 0
        p No transactions during the last 10 blocks
      else
        table.table
          thead
            tr
              th Hash
              th From
              th To
              th Amount
          tbody
            for tx in txs
              tr
                td
                  a(href="/tx/" + tx.hash) #{tx.hash.substr(0,10)}...
                td
                  a(href="/account/" + tx.from) #{nameformatter.format(tx.from)}
                td
                  if tx.to
                    a(href="/account/" + tx.to) #{nameformatter.format(tx.to)}
                  else
                    | New Contract
                td #{ethformatter(tx.value)}
    */
    
})