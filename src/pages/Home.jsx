import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { FiMapPin, FiCalendar, FiSearch, FiPhoneCall } from "react-icons/fi";
import "react-datepicker/dist/react-datepicker.css";
import "tailwindcss/tailwind.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const tamilNaduCities = ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli', 'Vellore', 'Erode', 'Tirunelveli', 'Thoothukudi', 'Thanjavur'];

const celebrityReviews = [
  { name: "MS Dhoni", review: "The best rental experience! The cars were in excellent condition, and the service was top-notch!", image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEBUSEhIVFhUXFxUWGBgVFxgYFRsVGxcgGBgWGBoeHyggGB0lHRcaITEhJSkrLi4xFx8zODMtNygtLisBCgoKDg0OGhAQGy0lICUvLS8vMC0tListKy0tNS0tLS0tLS0tLS0tLS0tNS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIANAA8wMBIgACEQEDEQH/xAAcAAABBAMBAAAAAAAAAAAAAAAAAQQGBwMFCAL/xABGEAABAQUEBQkHAwMDAgcBAAABAgADESExBBIyQQUiUXGhBhNCUmFiY4GRByMzscHh8HKi8RSS0QiCsiRDF1NUk6PCwxX/xAAZAQEAAwEBAAAAAAAAAAAAAAAAAQIDBAX/xAAkEQEAAgIBBAICAwAAAAAAAAAAAQIDESEEEjFBImEUURMy8P/aAAwDAQACEQMRAD8AuX4nZDzr/DL8Tsh51/hk+J2Q86/wx8Tsh51/hgPiTpDz/KMfEnSHmy/EnSHn+UZPiTpDzYD4k6Q82PiTpDzY+JOkPNjHOkPNgXHrUh59rGPWpdyr2sY9akPPtYx61LuVe1gTHrUu5V7WMevS7lWk2MetS7lXtZnpTSrh0nnX7xLsCMATEqui8boE1QAJkDIMDzHr0u5bYTZrb9IunY5x6sIAyM5AicqCJAjSY2tUPKX21qWopsDgVupevqSGJKAaxMYkwAAiJlqy05yitdpj/UWt69CibwKjcN0xEEiCYAkwEICJgBNp0Oiv/EbRi1ki0pggRUqBDsZgXlAXiY0QFFnjjlro56oKTa3QMQAFEpicQEVAZGO6bcmXSTD/AAJAZt5TuiwdqRve82ZVjCdWMXvKQy3Tq1F+zv2rPE81Z7YpJQ7gnnVY+bFCsx1rsgYAmE8iWvTF7zZlthOrQFxe8pDLd2smL3mzLd2suL3lIZbu1kr7zZlu7WAr7zZlu7WK+82ZfdivvNmW7tYr7zZl92Ar7zZl92WvvNmXCrFfebMvuxX3mzLhVgK+84cKsnicOFWWvvOHCrJ4nDhVgPF4cKseLw/bVjxeHCrHi8P21YDxeH7aseLw4VY8Xh+2rHi8OFWA8ThwqxT3nDhVjxOHCrFPecOFWA/p7+tGEcoRYY/p7+tGEcoMMB8Ssoedf4Y+JWUPOv8ADHxKyh9f4ZfiVlD6/wAMCfEnSHn+UY+JMyh5sfEmZQ/PoxjmZQYFxzpBkxzpBjHMygxjmZQYFx61IfyyY9akMuLLj1jKH8t4fPhdLxWqEAk5yEywVf7S/aymyvTZrIhK7QiAWtc3Ts1uwECtYzyHaYgU5pPTqrRef2ha3z9RgVrhASiAhAkkCdAAI0NG1embRzlofPCq9eeLVe2xUTHzZsp4SAMvz/JPmWtE6Dt65EEqmkQEE1VdJgSkGsyYfpJMJR8O3rtJBAnKJMwJTgMzGNc4bzhfvioiJJgEjcAAIAdkODYmbDtR5x4SMwCSewAE7BE0jKYZsMxvpt37G9oN2ZAPZl5/lWyJBUpMjDIAUEaff1YG8Gtj2Q+0Nbt+iyWt4pTpV1DpRncXRCDKISaRyzlEiBDk2/USUoVdyMMtp/B9GdaBdqsVtcrtCVc1fSVhJhFG2ECFXcUIThCUYtSLVmdRK847Vjcw6wxa9IZbmK+82Zbmx2d6l4hL5KgoFIUkiYUkiIUDsIMWyV18xluaVCV95syYr7zZkxX3mYyYr7zMZMC195syYr7zZlwYr7zMZMlfeZ7ODAtfecOFWTxOHCrL4mezgyeJns4MB4nDhVjxOHCrHiZ7ODHiZ7ODAeJw4VY8Thwqx4mezgy+Jns4MCeJw4VZfE4cKsniZ7ODL4mezgwJ/T39aMI5MMcwFaxMI5MMC/ErKH1/hk+JWUPr/DL8SurD6/wxjrKH1/hgTHMyh+fRjHMygy46yh+fRjHMygwJjmZQYxzMoMY5mUGMczKDAuOZlBqj/wBQdo/6Z1eTHnFJSiMYIKLylqEwIqCkCYMgaNbmOZlDJqM/1G6RKn1kczASh48IiYEqUEgw2i4f7mmBTjZrNZlLMEhsQEWmfI2yiMxlEb/4g2eS/ZXbXDj/AJLaYNE8iHj2ZUA0qsXs1dXYFSidpp6NJ7EgACDb+wO4t5lupyWniXrV6XFWPCD2T2aWVMSu8vzIAHkW2Fn5K2Z2QUOoQMoNNHtm3tgNlal75J8zLSlMceIhol2YAQAk0Y5UaMDx0YDWTMf4abWxEA0d0kzDeaXM1ItVI/YvpjnrCXK1ReWVQQATPmjEu9wBC0gbEBrBrr0Iy3NSns0f/wBNpfm+jaHa0gbXiAXieCVj/c11116EZbm9ne+XhWrqdCuvmMmSvvMxkxXXzGTLXXzGTFRX3mYyYr7zPZwYrr5jJivvM9nBgPEz2cGTxM9nBl8TPZwY8TPZwYE8TPZwY8TPZwZfEz2cGTxM9nBgPEz2cGPEz2cGPEz2cGXxM9nBgTxM9nBl8TPZwY8TPZwY8TPZwYE5gK1iYRyYY5gK1iYE5MMC48WrD6/wxjxasPz6MY8WrD6/wxjxasPz6MBjrKDGOZlBjHilCjGOapQowGOZlBjHMygxjmqUKMY5mUKdrAY5mRGTUH/qEs61W5w8KIJU4upMpqS8JUmkZX01lrZTjfmKZkRQbWr322aOL7R6X0IFw9STKd1fuzDzUn0aYTDnqy2bMtNNAu7t0+jaayWZBIjT8LSHQqYvEgUA/wABuTqLcS7+mryl2jV0i0lsT2DRaySMA0h0cEQipYG8t5sRO+HpbjXLZLtLeHb6MYBmdq07Y3ZuqeovQpeEWyOtJOrt5OYiGvO48qxr082xwpo/pSySJjBsHKzlYt2n3YClZCMN2/c0IfWi3vxffPnLlEaKWEn0r6wa2PD3fLeoUyZu3463KSWAjnrPaHagVObQ5KgCMHOJCwdmrea9TPXMiMtzc5cn9GKQtUHl9LxJReSTAE5taGhuWb60WpyShKULBvIqpMDdBjtvRJFIerelGStaw8y+K97TMR9p7XXzGTFdfMZMV1zUZMV18xk2rlFdfMZMV189nBiuvmMmK6+exgO/ns4MeJns4Md/pbODHf6WzgwHiZ7ODJ4mezgy9/pbODJ4nS2cPkwHiZ7ODL4mezgyeJ0tnD5Mvf6WzgwHiZ7ODHfz2cGO/wBLZwY7/S2cGBOZCtYmBOTDHMhWsTAnJhgXHi1YU89+5jHi1YU/DuYx4tWFPw7mMeLVhT8LAY8WrCn4WMc1ShRjHi1YU/CxjmqUKfhYDHNUoU7WTFNUiKdrLimqRFO31ZMU1SIp2+rAuKapEUG1tbyl0f8A1VjfuVSK3S0p/Vdik+SoHybZYpqkRQbWium+Vynb66HClBBgVCGIVEIxl5tS+StI3Zpjx2vOqufnLwXQZz25So0t0AlPNxFcyzTlnoUp5y1uQC5W8WuCSTcKlRKSCBIKJFBCADJyLtF52oTkc+3+G5c0xem4l6GHdLdswcW98+KwHa7ozkT6yk2q0m/WCEvLQskwF10kqeEmiR0UkwMI7C0t/wD5l8GBgcyKlsbnRDsOluHjpLx2pd8hUQq/CF68khUYSrSWbY0yVhtfHNo4RjR3JhfNItKQpTtd+cSXiShRSoPElOqQQaREqtNdB2FWB6pYjPZLKDOtH2ZRShygXHTsEJQiKUARiSrNUTEkqjNnZk93Nnmyd0r4adsaaJXJlK36i8BUkEG7KJRVUyRuhHMnKbJ9oCzOrd/UuwebClLS45p2mClJulPOAmLsRjdhlDtaZaWEEJeIyn5ZhsSLMh5BRgyua1Y1Cb4a3ncoVorRgdKWp2m4lRjdGEEUgPyrSTk+7Sm0kiRUmKf90/8AmFD0Z5bHKUyAgGYaHUf6yzXRHXCSOwPErHprNelpyRMT9M8kRjmJj7W4Z65qKBiuucQyYrrnEMmSuucQy/Jt6jxS11+kMmO/0tjFdc4tn5Njv9LZ+TYDv9LZw3sd/pbOG9jv9LZw3sd/pbOG9gO/0tnDfRk7/S6vDfRl7/S6vDfRk7/S6vDfRgO/0urw30Ze/wBLZw30ZO/0urw30Ze/0urw30YDv9LZw3sd/pbOG9jv9LZw3sd/pbOG9gTmQrWJgTlJhjmkqmTAnKTDAY8erCmXzZcePVhTL5smPHqwplvqxjx6sKZfNgXHi1YUy+bJimrVhTL5sYserCmUfVjFj1SKZR9WAxTVIimUfVjFNUiKZR9WMU1SIplH1YxTVIimUfVgXFNUiKCkfVoRpdyUvIqFXpjLJSog+hDTfFNUiKCkfVtPylsanrorEAtIpSIGsD5Ge4lufqcffTj06ujy9l+faDcrnaHYuOxHnAorAEoAAROWYT5jY1fcknXNqeJ2EjyBIDWlbAhabxEApJnCMFAhRQdhimB3NVdvef09sN2BQuCkkRmFfWMR5huPFzFqvRy8TW3+5TnRz4RaQWZ27VUQOZBhxq0J0PakrAILb9zaSM4/NsJ3WW8amEmCRAwAg2jU7vPFXTQwbY2a0RTBohyodIF5XPq5sm8UoJBJrJaVAgNOu5G+1K7PZb7pV5QGUCfk2lsukUO3iXBVrGXmTAGPaWiLzST5MA5tJS7UIjnE85CF0EBUQTiziTdM2Y2bTIcP1F4pKlxMSa0jGEIzreEm0jBOmf8ANG+U70ss8WTkZaANJOUyJIew382o+sA2gccoA/BSRdVURof8ZfNnnIZ5f0xZyOiHx/8AiWAOLbdLjmt+WHV3icc6XTXXMlCg+1WK65xDL7VYrrGShQfarFdY4hQfareg8ktdc4tn2qx3+ls+1WK6xxbPtVjvnF1ftVgTv9LZwpVjv9Lq8KVoy9/pdXhSrJ3+l1eFK0YDv9Lq8KVox3+l1eFK0Y7/AE+rwpWjHf6fV4UrSbAd/pdXhStJsd/pdXhStGO/0+rwpWk2O/0+rwpWjAd/pdXhStGXv9LZwpVk7/S6vClaMvf6XV4UqwJzSVTUYE1EmGOaSqajAmoiAwwGLHqwplHbVjFj1YUy+bGLHqwplHbVjFj1YUyjtqwLix6sKZR9WTFj1SKZR9WMWPVhTKPqxix6pFMo+rAYpr1SKZR9WMU1yIplH1YxTXqkUyj6sYprkRTKPqwLimqRFBSPqyYpqkRQUj6sYprkRQUj6sYpqkRQUj6sEM09o7m3l8C5HWEBCORSQZGEfQjY1c8v9D3XXPJhqrF4JGFBIF6WEXoerXpabOh6mD5IMKAy+/ZJmds0K5e2Z7ZygIS8QtBCRCN5MI7SZ17G5Y6bWTuieHd+ZvH2zHLnLRGkShRzFB5/cji02s9vvis5H5tAn7tTp6Xa5FBNayl6f5baOdIkQAVMwzkZGPzbLNi3Lpw5NRylWk9KlKLoJANT2bBtJMBBovAP3pHvXiT1TP1ok9tYQZwt+heKMZQ2mUJQ3tKbLC4EpuyAoBCP5k2UfCvDSY77cmLmwPwgBNnd3U4byHRunaDGMT2sw01ol6Ue8LokkYhehHOghuBZzpDSdtcgpQgEQrdjnD7swc2e2WkgvllKEqBhIRgdkGrFbR8tr2tWfjprnWjS4jFYMYEQTdoZ5kmE8/TOR+yVV/S14Qily+XL9SUj/mJBovyuthEUgwgRA5UhCdYj5tLPYI/dJevi8JS+eoTzAVhWlBJeBJzVG6SmRgmIjOHo4ImY7peZ1Noie2F111jJQoPtViuscWQ+1WK6xkoUH2qxXWOPIfarauQd44tn2qy944+r9qsneOPZ9qsd44+r9qsB3un1eFK0Y7/T6vClaMd7p9X7Vox3un1eFK0YDv8AT6vClaMd/p9XhStJsd7p9XhStGO/0+rwpWk2A7/T6vClaTY7/T6vClaMd/p9XhStJsd/p9XhStGA7/T6vClaMd7p9XhStGO90+rwpWjHe6fV4UrRgObSqajAmoiB82GObSZqVAmoiB82GAxY9WFMo7asYserCmUdtWMWPVhTLfXyYxY9WFMt9WAxY9WFMo+rGLHqkUyj6suLHqwpl82TFjkRTKPqwGKa5EUyj6sYprkRTKPqy4prkRTKPqyYprkRTKPqwGKa5EUFI+rGKapEUFI+rLimuRFBSPqximuRFBSPqwJimqRFBSPqxWapKFBSPke1is1SUKCkWx2m0JSgvHpCLojOW6Wc5MFEe0/RRTbHpSIKvFXkrXl6waB/1xCoKkR6x2Q3/k2t72gvQ/FntaRAPnf1JT5wPBqy0xokE3hGOfa2G4i00s7e2ZpF6mw0qCU1EyCRmKU/iPBpFoXTUFC6oQEzH1hLszn5NA7RZykebJZrapEZRiGvbFExpnXPNZ5Xs50ghYBJSIf4jL82sz0zb3aXZIVsyO6HZvapnfKJaRKMYjzEKHbVvCtMvVgJEYkwAGez0bm/Gnbp/Lro705bC9eBCTGJzyFYwjL885Xyks5sthsCkRS8dXSCJKClpL0zyMQG1XI/k/ztoQhcyZvNiXQmsedI7SG33tTtJWt06Gd94ewSSngFt3dPzPHhxZ/vzKVckPaulepbUm+kC69QIpX+tAortTI7BnPLBynsb6abQjnMkKNwnclcCfJua7OiEm3FltKgggmWUZ+Tdc4Ky5otLpOuv0sht8qsd449n2q1BaE0/aLKoFy8KQDG5V2d6KeYn2tOdGe09JINocQV1nRlsmhRiB/uLZWwWjxytFoWJ3un1ftWjHe6fV4UrRtPYOVNjfaybQgL6qzcOyEFQj5FtwDEX+lkMvTc2MxMeVh3un1eFK0Y73T6vClaTY73T6vClaMd7p9XhStGgHe6fV4UrSbHe6fV4UrRjvdPq8KVox3uns4UrRgO90+rwpWjHe6fV+1aMd7p7OFK0Y73T2fatGA5tJmpUDmIgfNhjm0majA5iIDDAYviShTLfXyYxY5Qplvqxi+JKFMt/wBGXF8SUKZb2BMWOUKZMYsciKZMuLHKFMmTFjkRTJgMU1yIpkximuRFMmK45EUybDa7Y7Qm/aFpdgUK1BI41YM9ZrkRTKLanTfKGz2cRfrguqXaBFZzpkO0kBoZyn9oKnnu7ICMi+IgYeGk0/UfTNoNcJJKlEqJiSokknaSZk726KYJnmyk3/SS6e9p1rWohw6Q5Aooi+87DPVG6B3tpLVyjtT5BD588eS6UAIwhJKQBmcm1r9IB2lvIXQN0RjrHiFNymyrCq06IcqdRU8s0VFAmVuYlKwkZqSdaGcIZtFXtmC0giYqIbGl/IK1FIUhJgULKk7iApQ3a8/1NttM8j+cUX9kASs6y3EYJJNVOzRMdhluz8nq8U93dV6XSZqxHbZUVq0UkmY+ja95ybCzqRjui0+tVgIJQpBSoVSoQI8jMNr3+jlCaSQW5K55j27bYKz6V7a9AP0GBQD2pbaaC0CoLTBJW8UbqUpEZnINOuT+i3j16EpSVrPy+gDW7yd5OOrML11JekQUsASHVTsHz9ANqXvl49ftzXpjwc+/UIXyb5NGyuSCkl6uBeEAwGx2nsG3M+UITyqst62vFqyCXYHYBE/uJa+9IvQlBJahtLPi8eKeHpKUr1MW9Pp414edltM8yjVqsxSY5NmsqYpZ4ucqxZkp0sSSbqKlVVbkig3n0brZM6CCAc897ei3hy7gJU/KmpbI0jwHhDPtHabfuCC5erR+kmB3pofMMweN4U0TGxO7B7TLUkgvEu3naRdVs6MuDbyx+1B0VReOFpO1CgsbKG6eLVMYshJbOcNJ9J7pX5YOWFhfKHN2lHOmACVXkRJkALwET2AtvO909nCm5uXVrm14+y/TirRZClaip85IRMxUp2RqKOZMApMe5HNufLh7Y3C9bbTHvdPZwpuY73T2fbcx3uns+25l73T2fbc2CxObSZqMDmIwYYuJM1GCsxGDDAYviS2Zb/oxi+JLZlv+jFfiS2Zb/oyjW+JLZlv+jAhMZvNWExlvaKaW9oFjdxBKnqhQOgLv9xMCO0RaveVHKl/aXzwc6rmSVBKEmCLiTAEjMms417A0f5kkt1U6f3ZSb/pL9L+0e1vjB2EuU5XReV5qMvQBo4+ePHqucfLUtW1RKj6lsbp1BsylNvFYr4hSZ2EgNhtlqCRUCMhvYeKbGtwmBvAQLShhb07TOJbE4cXcyR0QagbI5s4FWkTfk1YAbOp+gC+l9cV2hSEhEa9KKZA/EB6IaeaBtiVgAyM4bYgwI3ggg9oLR72Y2ZLyzWhKoweK5tUDAwLsQgcjrKmNoZ/oyzr5xSFQBElKwgP0kIEBkHgEQnJIdZqLcGSflMN6+Em0loh0/TdeoCiKKosbj9KNXNt0fZedKEW1ASFXSp6hSExlJDwgO3pmKKFWa+2vlc/s1jdWZ2ooeP1LC1gwIdO7sUjMXioDcFDNqgeW9+tyC8tD9YE4KevCkExjARgKmQ2lsZ6auWeYa06i+PxLpbk7a7DZ1JsqXjtL55EpvPHalvQMwQf2yzgDMtJ1KAmW4kLyECAEmohEHfGLdC+xflo+ttnVZrSVKeOLt16qOu7MQAtWaxdMzNQGZBJtFYjiGczMzuUl5d6SPMKQmOsCD+mh9Yw3Xj0S1U2gxLTvlhbUvLOHqSmL1QSIAgl18V0fJJH97zrNA1ibdXT+Jlnk9Gz0BsaDlk2V4lsQDdLNifkAUmTCGW35At4iyvjFQGwR8zIfI+rKhLAVb0Et7SmVWUMGIu+xmxwx60/X7M6tWEjy9ZfVsT8ZBg1z1LTv2P6RKLbzf/mu1pA2rTrj9qV+rQh8hnXJjTJslrdPwI3FAwzIhdUBlEpJHm1LxuJhMTy6W73T2fbcx3uns+25sGj7ah86Q/dKvX0hSdx7MjDJs/b09n23N57YXEGajBWYiwxcQZqMFZsMC1+JLZlv+jMdOW0OrM+fPZc27WpOUTCQHaTAebPq/Els+v0aB+2G3lNiQ7XV49T/AGoF4n+641qRu0QifCqnNE+Y4fZniAzBxgjsUP8ADbEN6LEuTeFqb2pWTIGgJAgEthdGIiatmWpmzk6gjsaR5L0FXDtj2tmFZNhcJ2CQo2UVYLU9kqoun6di0H1Sf8NJtN2J4sp5qAKqqgNVaYFCyDigQFb3aBIGIh/ske61oTtDo+hWGscgRBhNuDNHzltSdQjfK/k2m1WW0O1BJePnRQDCQUmKnIGwJWY9sS3KVltKkxdnbCeW0Qbs+0CKT6tyVy+sYdaYtSEmXPrUKQAWb8JbL0PJq1mYnhLV6J0U9tdpS5dDWUZnJKRiUewcZATIbq/kryed2Wxu7OE6qUgEECJJqVdpJJPaSc2pT/T9arOLe+dPPiPEguiYTuEqUjbE6qoeGdgboVSomGz5tEitfaS6S7LpKemVr3BMAkdoJevFb1nshBiGlntMtF63hIMnbpA/3FSlHhd9GiTduKNUhledyRbYFIbKotgfqIB20G8yB+vk2ipsDU7TwEh8o+bKDFkDvIUEvJsyUQEGkKkMoLDBLBiezUmfb6fy2J4mJLe70SYZSbz2tIaPmYr2s+fBmT0NEpXZ7G9MJe2EuP8AuuFEAbXayVA+RKh5Da0/7ens/OxudfZjpg2bSTkgwS8PMq3LgE/vunybort6ez87G4c1dWaVngl1BmswVmwxdQcZ1s2GyWLX4ktn1+jVD7aLeo2hy7IiHbtSiO14qfB2PVrer8Ty+tPJueuXWky/0g/eAxF8pGyCNQQ7Ddj5ttgjdtq28NXo9YUlSRslFtm6eRALaixKgsEQgcme2R5NSc0kjyqODdrI5i3u9JsJZAtgzFsKESIO0/NvbJ0j2iPpL/DAqQwasBlLBPvZMr/qno2uo+iwP/s1orqGqP2XLhpCG1y8H7kH6NbiqhuLP/drTwaaa0iiz2d7aHpgh2hS1QrACMB2mg3tx7pPSa7Tanloe43i1LOwRMgOwCQ3Nev+ojTXN2F1ZUmb95FXa7dwUR/eXZ8i1B2FzeJ3S/w2dY3KxdG2145tDt86VdeO1pWk94GIj2djdg8n9JItNmdWhAgl6hLyBqIpBKT2gmB3NxsvFLa3TXsXtt/QzuJ+Gq0IPm9K/kpo9CHcrLRft9pVH/uXf7EJdkeqS2qLIp/zilPIY1reHbFaio/NvN5vQiNREMJIQ2Bc1Q2D9x+oH/INleKABJoIk7hmzZxGETUxUd5y8hAeTSMkGQN5JbzFpHstifrgIt6UZNqdLvzduiqiB6sngOrO91Y7TFswVEM1cpkBkGzKVANKXl9Vte+zZ9EFmL5Uy0SGV9QMUkgihFQdobqvQ1uD+zObQnE9dO3kP1JBp5tysERClHybor2W21L3RNmUjGkKdkfoWUj9sD5huXPHESvVK4IOPFmwxBHTxZ1YbmXM9NWku7M+eLqh08WnelBOW4NzTem3R3KuP9Ba+cr/AE7+7/7ao08m5sUiM9uxurp/alzkuhVJgWR+9uvEvMlC6r9QmPzsZsVLRPEOyrZHiw8dqArUbxP6N0KNulURFsKnk2ZaPtsUja2V49EWkbF0qLI+VQ9sPIy+cGbuH0myvZpI7OOTEM4LeQWxuXgIBb0VMEn5AWi7pKz94rR6oV9YNdhMyW560LaubtLhfVfOz5XgC3QClRPYG5Ooj5Q1p4c9+3+1l5pF27jJDgGHeW8VH9qUejQGxurqCWkXtXtXOaXtKoyHNIG5LlER6knzaLIfQBGRauOYieUzG4NECbXZ7LLeXegLdA6wevrvYTZ0BP7mpRSoFrB5FW6Gh7W7jC/aXCR5i+R6OT6tWsbmITPg7RIMXuDYwoN5Kg3ewYba8ipLvrG8f0JmfUlI3EtlKmYWR7eUp5kTcT+lJgT5qj6BnCltEftLIpTeYtjL1vCnkmsgr9baS1vIvEDKMeBZ9ansm06nqQ8F8wEC1LSmGzNsnddpKj2TZXSFE65/2p+pybHZHqVCQN30H3Z4HgAk0xyFeKgINrsSiMhNR+je7XaZ3U1PDtLNHj66LiJmpOQO1R+QaJsaebe9ibgoK9g2NdPsBUr+itEP/Uao7eaRe7KQakkOZcSTUlrp/wBP9tCrNanacSH6Vjct2E//AJFsMv8AXleq1II6eLOrDEEdPFnX6MNyrv/Z", rating: 5 },
  { name: "Virat Kohli", review: "Top-class service and smooth booking process. Will definitely use this again!", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSABL70rUSdhYXUrDJtQA9HMLS3invhsyBGwQ&s", rating: 4 },
  { name: "Ana de Armas", review: "Luxury at its finest!The best experience I've had so far.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSrOnOzx1r0LhMATVeZUQJK4yQjUKkPBHyyg&s", rating: 5 },
  { name: "Shah Rukh Khan", review: "Amazing selection of cars and impeccable customer service!", image: "data:image/jpeg;base64,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", rating: 5 },
  { name: "Cristiano Ronaldo", review: "Super easy booking process and the car was spotless!", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2THqz6lYlzuvowWr53fKhYp4LH3XSl8thbg&s", rating: 4 },
  { name: "Adolf Hitler", review: "Loved the premium service and seamless experience!", image: "data:image/jpeg;base64,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", rating: 5 }
];
function Home() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [pickupDate, setPickupDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);

  const phonePattern = /^[6-9]\d{9}$/; // Ensures a valid 10-digit Indian number

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!location || !phone || !pickupDate || !returnDate) {
      toast.error("Please fill all fields before searching!");
      return;
    }

    if (!phonePattern.test(phone)) {
      toast.error("Enter a valid 10-digit phone number!");
      return;
    }

    const searchData = { location, phone, pickupDate, returnDate };

    try {
      const response = await fetch("http://localhost:5000/api/search/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(searchData),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Search stored successfully! Redirecting...");
        setTimeout(() => navigate("/booking-success"), 1500);
      } else {
        toast.error(data.error || "Failed to store search data");
      }
    } catch (error) {
      toast.error("Server error! Try again later.");
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hero Section */}
      <motion.div 
        className="relative h-[600px] bg-gradient-to-r from-gray-900 to-gray-600"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=80"
          alt="Luxury car"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
          <motion.h1 
            className="text-6xl font-bold text-white mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Find Your Perfect Drive
          </motion.h1>
          <motion.p 
            className="text-xl text-white mb-8"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Premium cars at competitive prices
          </motion.p>

          {/* Booking Form */}
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-lg max-w-4xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <FiMapPin className="absolute left-3 top-3 text-gray-400" />
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border rounded-md"
                  required
                >
                  <option value="">Select location</option>
                  {tamilNaduCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <FiPhoneCall className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone number"
                  className="w-full pl-10 pr-3 py-2 border rounded-md"
                  required
                />
              </div>

              <div className="relative">
                <FiCalendar className="absolute left-3 top-3 text-gray-400" />
                <DatePicker
                  selected={pickupDate}
                  onChange={(date) => setPickupDate(date)}
                  placeholderText="Pick-up date"
                  className="w-full pl-10 pr-3 py-2 border rounded-md"
                  minDate={new Date()}
                  required
                />
              </div>

              <div className="relative">
                <FiCalendar className="absolute left-3 top-3 text-gray-400" />
                <DatePicker
                  selected={returnDate}
                  onChange={(date) => setReturnDate(date)}
                  placeholderText="Return date"
                  className="w-full pl-10 pr-3 py-2 border rounded-md"
                  minDate={pickupDate || new Date()}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-600 flex items-center justify-center space-x-2"
              >
                <FiSearch />
                <span>Search Cars</span>
              </button>
            </form>
          </motion.div>
        </div>
      </motion.div>

      {/* Celebrity Reviews */}
      <motion.section 
        className="py-12 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-8">
            Celebrity Reviews
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {celebrityReviews.map((review, index) => (
              <motion.div
                key={index}
                className="relative bg-white p-6 rounded-lg shadow-lg text-center cursor-pointer hover:scale-105 transition-all"
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedReview(review)}
              >
                <img src={review.image} alt={review.name} className="w-24 h-24 mx-auto rounded-full mb-4 object-cover" />
                <h3 className="text-xl font-semibold mb-2">{review.name}</h3>
                <p className="text-gray-600 text-sm">{review.review}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <ToastContainer position="bottom-right" />
    </motion.div>
  );
}

export default Home;