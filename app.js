let subtotal = 0.0;

$(function(){

    $(document).on('change', 'input', function(){
        let row = $(this).closest('tr');
        let qty = row.find('.qty').val();
        let price = row.find('.price').val();

        subtotal = parseFloat(qty) * parseFloat(price);

        row.find('.subtotal').val(isNaN(subtotal) ? "" : subtotal);
        row.find('.subtotal-display').val(isNaN(subtotal) ? "" : currencyFormat(subtotal));
        
        calculateGrandtotal();
    });

    $(document).on('keypress', function(e){
        if (e.which == 13) {
            let rowItems = `<tr>
                <td>
                    <input type="number" class="qty form-control border-1 shadow-none" required>
                </td>
                <td>
                    <input type="text" class="price form-control border-1 shadow-none">
                </td>
                <td>
                    <input type="hidden" class="subtotal form-control border-0 shadow-none" readonly>
                    <input type="text" class="subtotal-display form-control border-0 shadow-none" readonly>
                </td>
                <td>
                    <a class="btn-sm btn btn-danger remove-item">x</a>
                </td>
            </tr>`;
            $('#row-items').append(rowItems);
        }
    });

    $(document).on('click', '.remove-item', function(e){
        $(this).closest('tr').remove()
        calculateGrandtotal();
    })
});

function calculateGrandtotal() {
    let grandTotal = 0.0;

    $.each($('#row-items').find('.subtotal'), function(){
        let subtotal = parseFloat($(this).val());

        if (!isNaN(subtotal) && subtotal != '') {
            grandTotal += subtotal;
        }
    
    }); 

    $('#grandtotal').text(currencyFormat(grandTotal));
}

function currencyFormat(paramAmount) {
    return `Rp. ${paramAmount.toLocaleString('en-US')}`
}