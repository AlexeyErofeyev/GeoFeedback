<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style>
		html *, html *:before, html *:after{
			box-sizing: border-box;
			margin: 0;
			padding: 0;
			line-height: 100%;
			font-size: 17px;
		}
		.list{
			list-style: none;
		}

		.list:after{
			content: "";
			display: table;
			clear: both;
		}

		.item{
			float: left;
			/*border: 1px solid black;*/
			padding: 5px 10px;
			position: relative;
		}

		.item:before{
			content: "";
			display: block;
			position: absolute;
			width: 1px;
			height: 14px;
			top: 50%;
			left: 0px;
			transform: translateY(-50%);
			background-color: red;
		}

		.lang{
			list-style: none;
			display: block;

		}

		.flag{
			display: block;
			min-width: 120px;
			height: 17px;
			background-image: url('flag-european-union-icon.png');
			background-repeat: no-repeat;
			background-position: left center;


		}

		.flag:after{
			content: "";
			display: block;
			width: 7px;
			height: 4px;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			right: 5px;
			background-color: red;
		}

		.flag span{
			padding-left: 35px;
			vertical-align: top;
			margin-right: 5px;
		}

		@media screen and (max-width: 320px) {
			.flag{
				min-width: 50px;
			}

			.flag span{
			display: none;
			padding-left: 35px;
			vertical-align: top;
			}
		}

		
	</style>
</head>
<body>
	<header>
		<ul class="list">
			<li class="item">
				<ul class="lang">
					<li><a href="#" class="flag"><span>русский</span></a></li>
					<li><a href="#" class="flag"><span>русский</span></a></li>
					<li><a href="#" class="flag"><span>русский</span></a></li>
				</ul>
			</li>
			<li class="item">two</li>
			<li class="item">three</li>
			<li class="item">four</li>
			<li class="item">five</li>
			<li class="item">six</li>
		</ul>
	</header>
</body>
</html>
