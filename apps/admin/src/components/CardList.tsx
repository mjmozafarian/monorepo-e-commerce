import Image from "next/image";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { OrderType, ProductsType } from "@repo/types";
import { auth } from "@clerk/nextjs/server";

//TEMPORARY
// const products = [
//     {
//         id: 1,
//         name: "Adidas CoreFit T-Shirt",
//         shortDescription:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         description:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         price: 39.9,
//         sizes: ["s", "m", "l", "xl", "xxl"],
//         colors: ["gray", "purple", "green"],
//         images: {
//             gray: "/products/1g.png",
//             purple: "/products/1p.png",
//             green: "/products/1gr.png",
//         },
//     },
//     {
//         id: 2,
//         name: "Puma Ultra Warm Zip",
//         shortDescription:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         description:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         price: 59.9,
//         sizes: ["s", "m", "l", "xl"],
//         colors: ["gray", "green"],
//         images: { gray: "/products/2g.png", green: "/products/2gr.png" },
//     },
//     {
//         id: 3,
//         name: "Nike Air Essentials Pullover",
//         shortDescription:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         description:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         price: 69.9,
//         sizes: ["s", "m", "l"],
//         colors: ["green", "blue", "black"],
//         images: {
//             green: "/products/3gr.png",
//             blue: "/products/3b.png",
//             black: "/products/3bl.png",
//         },
//     },
//     {
//         id: 4,
//         name: "Nike Dri Flex T-Shirt",
//         shortDescription:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         description:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         price: 29.9,
//         sizes: ["s", "m", "l"],
//         colors: ["white", "pink"],
//         images: { white: "/products/4w.png", pink: "/products/4p.png" },
//     },
//     {
//         id: 5,
//         name: "Under Armour StormFleece",
//         shortDescription:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         description:
//             "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//         price: 49.9,
//         sizes: ["s", "m", "l"],
//         colors: ["red", "orange", "black"],
//         images: {
//             red: "/products/5r.png",
//             orange: "/products/5o.png",
//             black: "/products/5bl.png",
//         },
//     },
// ];
// const latestTransactions = [
//     {
//         id: 1,
//         title: "Order Payment",
//         badge: "John Doe",
//         image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800",
//         amount: "$250.00",
//         count: 25000,
//     },
//     {
//         id: 2,
//         title: "Order Payment",
//         badge: "Jane Smith",
//         image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800",
//         amount: "-$75.00",
//         count: 7500,
//     },
//     {
//         id: 3,
//         title: "Order Payment",
//         badge: "Sarah Johnson",
//         image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=800",
//         amount: "$99.99",
//         count: 9999,
//     },
//     {
//         id: 4,
//         title: "Order Payment",
//         badge: "James Roberts",
//         image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800",
//         amount: "$1,200.00",
//         count: 120000,
//     },
// ];

const CardList = async ({ title }: { title: string }) => {
    let products: ProductsType = [];
    let orders: OrderType[] = [];
    const { getToken } = await auth();
    const token = await getToken();
    if (title === "Popular Products") {
        products = await fetch(
            `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products?limit=5&pupular=true`
        ).then((res) => res.json());
    } else {
        orders = await fetch(
            `${process.env.NEXT_PUBLIC_ORDER_SERVICE_URL}/orders?limit=5`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        ).then((res) => res.json());
    }
    return (
        <div className="">
            <h1 className="font-medium text-lg mb-6">{title}</h1>
            <div className="flex flex-col gap-2">
                {title === "Popular Products"
                    ? products.map((item) => (
                          <Card
                              key={item.id}
                              className="flex-row items-center justify-between gap-4 p-4"
                          >
                              <div className="w-12 h-12 rounded-sm relative overflow-hidden">
                                  <Image
                                      src={
                                          Object.values(
                                              item.images as Record<
                                                  string,
                                                  string
                                              >
                                          )[0] || ""
                                      }
                                      alt={item.name}
                                      fill
                                      className="object-cover"
                                  />
                              </div>
                              <CardContent className="p-0 flex-1">
                                  <CardTitle className="text-sm font-medium flex items-center justify-between gap-2">
                                      {item.name}
                                  </CardTitle>
                              </CardContent>
                              <CardFooter className="p-0">
                                  ${item.price}
                              </CardFooter>
                          </Card>
                      ))
                    : orders.map((item) => (
                          <Card
                              key={item._id}
                              className="flex-row items-center justify-between gap-4 p-4"
                          >
                              <CardContent className="p-0 flex-1">
                                  <CardTitle className="text-sm font-medium flex items-center justify-between gap-2">
                                      {item.email}
                                  </CardTitle>
                                  <Badge variant="secondary">
                                      {item.status}
                                  </Badge>
                              </CardContent>
                              <CardFooter className="p-0">
                                  ${Number(item.amount) / 100}
                              </CardFooter>
                          </Card>
                      ))}
            </div>
        </div>
    );
};

export default CardList;
