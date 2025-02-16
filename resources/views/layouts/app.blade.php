<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=1024, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }}</title>

        <link rel="shortcut icon" href="{{ asset('images/Prepare-a-timetable.png') }}" type="image/png">
        <link rel="stylesheet" href="{{ asset('css/bootstrap.min.css') }}">
        <link rel="stylesheet" href="{{ asset('DataTables/datatables.css') }}">
        <link rel="stylesheet" href="{{asset('js/fontawesome/css/all.min.css')}}">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <script src="{{ asset('js/jquery.js') }}"></script>
        <script src="{{ asset('js/swal.js') }}"></script>
        <script src="{{ asset('js/bootstrap.min.js') }}"></script>
        <script src="{{ asset('js/bootstrap.min.js') }}"></script>
        <script src="{{ asset('js/fontawesome/js/all.js') }}"></script>
        <script src="{{ asset('DataTables/datatables.js') }}"></script>

        
        <!-- Fonts -->
        {{-- <link rel="preconnect" href="https://fonts.bunny.net"> --}}
        {{-- <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" /> --}}

       
        <style>
            *{
                font-family: emoji serif auto;
                margin: 0px;
                padding: 0px;
                box-sizing: border-box;
            }
            .layeout{
                background: #80808047;
                width:100%;
                height: 100vh;
                z-index: 9999;
                position: absolute;
                top:0px;
            }

            .layeout div{
                position: absolute;
                left: 43%;
                top: 50%;
                transform: translateY(-50%);
            }
        </style>
        <!-- Scripts -->
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    </head>
    {{-- all ajax we passing csrf toket  --}}
    <script>
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $(document).ajaxError(function (event, jqXHR, ajaxSettings, thrownError) {
            $('.layeout').hide();
            if (
                jqXHR.readyState == 4 &&
                jqXHR.responseJSON != undefined &&
                jqXHR.responseJSON.message != undefined
            ) {
                let message = jqXHR.responseJSON.message;
                message = message.split("(")[0];
                swal.fire({
                    icon: "error",
                    text: message,
                    allowOutsideClick: false,
                });
            }
        });

    </script>
    <body class="font-sans antialiased">
        <div class="layeout">
            <div style="text-align: center;">			
                <img id="loading_screen" width="200" height="200" src="{{asset('images/LoadingScreen.gif')}}">
            </div>
        </div>
        <div class="min-h-screen bg-gray-100">
            @include('layouts.navigation')

            <!-- Page Heading -->
            @isset($header)
                <header class="bg-white shadow">
                    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {{ $header }}
                    </div>
                </header>
            @endisset

            <!-- Page Content -->
            <main>
                {{ $slot }}
            </main>
        </div>
    </body>
    <script>
        $('.layeout').hide();
    </script>
</html>
