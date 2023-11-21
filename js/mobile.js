var totalAmount = 0; // declare totalAmount globally
        var selectedOption = ''; // declare selectedOption globally
        var paymentHistory = [];

        function showImage(selectedOption) {
            // Hide all menu images
            var menuImages = document.querySelectorAll('.menu-image');
            menuImages.forEach(function(image) {
                image.style.display = 'none';
            });

            // Show the selected menu image
            var selectedImage = document.getElementById('image-' + selectedOption);
            if (selectedImage) {
                selectedImage.style.display = 'block';

                // Show the pop-up with the selected image
                showPopup(selectedImage.children[0].src);
            }

            // Tambahkan kode untuk mengambil harga masing-masing menu
            var menuPrices = {
                'Nasi Putih': 5.00,
                'Bakmi ayam': 7.50,
                'Basko Sapi': 8.00,
                'Ayam Geprek': 6.50
            };

            // Hitung total pembayaran berdasarkan menu yang dipilih
            totalAmount = menuPrices[selectedOption] || 0; // Update the global totalAmount variable

            // Tampilkan total pembayaran
            document.getElementById('totalAmount').textContent = 'Rp ' + totalAmount.toFixed(2);
        }

        function showPopup(imageSrc) {
            var popup = document.getElementById('popup');
            var popupImage = document.getElementById('popup-image');

            // Set the image source in the pop-up
            popupImage.src = imageSrc;

            // Show the pop-up
            popup.style.display = 'block';
        }

        function closePopup() {
            var popup = document.getElementById('popup');
            popup.style.display = 'none';
        }

        function searchKeyPress(event) {
            if (event.key === 'Enter') {
                performSearch();
            }
        }

        function performPayment() {
            var paymentMessage = document.getElementById('paymentMessageText');
            var paymentMessageContainer = document.getElementById('paymentMessage');

            if (totalAmount > 0) {
                // Tampilkan pesan pembayaran berhasil
                paymentMessage.textContent = 'Pembayaran sebesar Rp ' + totalAmount.toFixed(2) + ' berhasil dilakukan!';
                paymentMessageContainer.style.backgroundColor = '#4CAF50'; // Ganti warna latar belakang sesuai keinginan
            } else {
                // Tampilkan pesan bahwa menu belum dipilih
                paymentMessage.textContent = 'Pilih menu terlebih dahulu sebelum melakukan pembayaran.';
                paymentMessageContainer.style.backgroundColor = '#f44336'; // Ganti warna latar belakang sesuai keinginan
            }

            // Tampilkan elemen pesan
            paymentMessageContainer.style.display = 'block';

            // Sembunyikan elemen pesan setelah beberapa detik
            setTimeout(function () {
                paymentMessageContainer.style.display = 'none';
            }, 3000); // Ubah durasi sesuai keinginan (dalam milidetik)

            // Step 2: After successful payment, add transaction to payment history
            if (totalAmount > 0) {
                var transaction = {
                    date: new Date().toLocaleString(),
                    items: selectedOption,
                    totalAmount: totalAmount.toFixed(2),
                };

                paymentHistory.push(transaction);
            }
        }

        function showPaymentHistory() {
            var historyPopup = document.getElementById('history-popup');
            var historyContent = document.getElementById('history-content');

            // Clear previous content
            historyContent.innerHTML = '';

            // Build and display payment history
            if (paymentHistory.length > 0) {
                paymentHistory.forEach(function (transaction) {
                    var transactionInfo = document.createElement('p');
                    transactionInfo.textContent = `${transaction.date} - ${transaction.items} - Rp ${transaction.totalAmount}`;
                    historyContent.appendChild(transactionInfo);
                });
            } else {
                var noHistoryInfo = document.createElement('p');
                noHistoryInfo.textContent = 'No payment history available.';
                historyContent.appendChild(noHistoryInfo);
            }

            // Show the history popup
            historyPopup.style.display = 'block';
        }

        function closeHistoryPopup() {
            var historyPopup = document.getElementById('history-popup');
            historyPopup.style.display = 'none';
        }