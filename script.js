
var apertou = 0;
var __PDF_DOC,
    __CURRENT_PAGE,
    __TOTAL_PAGES,
    __PAGE_RENDERING_IN_PROGRESS = 0,
    __CANVAS = $('#pdf-canvas1').get(0),
    __CANVAS_CTX = __CANVAS.getContext('2d');
__CANVAS2 = $('#pdf-canvas2').get(0),
    __CANVAS2_CTX = __CANVAS2.getContext('2d');
__CANVAS3 = $('#pdf-canvas3').get(0),
    __CANVAS3_CTX = __CANVAS3.getContext('2d');
__CANVAS4 = $('#pdf-canvas4').get(0),
    __CANVAS4_CTX = __CANVAS4.getContext('2d');

function showPDF(pdf_url) {
    $("#pdf-loader").show();

    PDFJS.getDocument({ url: pdf_url }).then(function (pdf_doc) {
        __PDF_DOC = pdf_doc;
        __TOTAL_PAGES = __PDF_DOC.numPages;

        // Hide the pdf loader and show pdf container in HTML
        $("#pdf-loader").hide();
        $("#pdf-contents").show();
        $("#pdf-total-pages").text(__TOTAL_PAGES);

        // Show the first page
        showPage(1);
    }).catch(function (error) {
        // If error re-show the upload button
        $("#pdf-loader").hide();
        $("#upload-button").show();

        alert(error.message);
    });;
}

function showPage(page_no) {
    __PAGE_RENDERING_IN_PROGRESS = 1;
    __CURRENT_PAGE = page_no;

    // Disable Prev & Next buttons while page is being loaded
    $("#pdf-next, #pdf-prev").attr('disabled', 'disabled');

    // While page is being rendered hide the canvas and show a loading message
    $("#pdf-canvas").hide();
    $("#page-loader").show();
    $("#download-image").hide();

    // Update current page in HTML
    $("#pdf-current-page").text(page_no);

    // Fetch the page
    __PDF_DOC.getPage(page_no).then(function (page) {
        // As the canvas is of a fixed width we need to set the scale of the viewport accordingly
        var scale_required = __CANVAS.width / page.getViewport(1).width;

        // Get viewport of the page at required scale
        var viewport = page.getViewport(scale_required);

        // Set canvas height
        if (apertou == 1) {
            __CANVAS.height = viewport.height;

            var renderContext = {
                canvasContext: __CANVAS_CTX,
                viewport: viewport
            };
            apertou = 0;
        }
        if (apertou == 2) {
            __CANVAS2.height = viewport.height;

            var renderContext = {
                canvasContext: __CANVAS2_CTX,
                viewport: viewport
            };
            apertou = 0;
        }
        if (apertou == 3) {
            __CANVAS3.height = viewport.height;

            var renderContext = {
                canvasContext: __CANVAS3_CTX,
                viewport: viewport
            };
            apertou = 0;
        }
        if (apertou == 4) {
            __CANVAS4.height = viewport.height;

            var renderContext = {
                canvasContext: __CANVAS4_CTX,
                viewport: viewport
            };
            apertou = 0;
        }


        // Render the page contents in the canvas
        page.render(renderContext).then(function () {
            __PAGE_RENDERING_IN_PROGRESS = 0;

            // Re-enable Prev & Next buttons
            $("#pdf-next, #pdf-prev").removeAttr('disabled');

            // Show the canvas and hide the page loader
            $("#pdf-canvas").show();
            $("#page-loader").hide();
            $("#download-image").show();
        });
    });
}

// Upon click this should should trigger click on the #file-to-upload file input element
// This is better than showing the not-good-looking file input element
$("#upload-button").on('click', function () {
    apertou = 1;
    $("#file-to-upload").trigger('click');
});
$("#upload-button2").on('click', function () {
    apertou = 2;
    $("#file-to-upload2").trigger('click');
});
$("#upload-button3").on('click', function () {
    apertou = 3;
    $("#file-to-upload3").trigger('click');
});
$("#upload-button4").on('click', function () {
    apertou = 4;
    $("#file-to-upload4").trigger('click');
});

// When user chooses a PDF file
$("#file-to-upload").on('change', function () {
    // Validate whether PDF
    if (['application/pdf'].indexOf($("#file-to-upload").get(0).files[0].type) == -1) {
        alert('Error : Not a PDF');
        return;
    }

    $("#upload-button").hide();

    // Send the object url of the pdf
    showPDF(URL.createObjectURL($("#file-to-upload").get(0).files[0]));
});
$("#file-to-upload2").on('change', function () {
    // Validate whether PDF
    if (['application/pdf'].indexOf($("#file-to-upload2").get(0).files[0].type) == -1) {
        alert('Error : Not a PDF');
        return;
    }

    $("#upload-button2").hide();

    // Send the object url of the pdf
    showPDF(URL.createObjectURL($("#file-to-upload2").get(0).files[0]));
});
$("#file-to-upload3").on('change', function () {
    // Validate whether PDF
    if (['application/pdf'].indexOf($("#file-to-upload3").get(0).files[0].type) == -1) {
        alert('Error : Not a PDF');
        return;
    }

    $("#upload-button3").hide();

    // Send the object url of the pdf
    showPDF(URL.createObjectURL($("#file-to-upload3").get(0).files[0]));
});
$("#file-to-upload4").on('change', function () {
    // Validate whether PDF
    if (['application/pdf'].indexOf($("#file-to-upload4").get(0).files[0].type) == -1) {
        alert('Error : Not a PDF');
        return;
    }

    $("#upload-button4").hide();

    // Send the object url of the pdf
    showPDF(URL.createObjectURL($("#file-to-upload4").get(0).files[0]));
});

// Previous page of the PDF
$("#pdf-prev").on('click', function () {
    if (__CURRENT_PAGE != 1)
        showPage(--__CURRENT_PAGE);
});

// Next page of the PDF
$("#pdf-next").on('click', function () {
    if (__CURRENT_PAGE != __TOTAL_PAGES)
        showPage(++__CURRENT_PAGE);
});

// Download button
$("#download-image").on('click', function () {
    $(this).attr('href', __CANVAS.toDataURL()).attr('download', 'page.png');
});

