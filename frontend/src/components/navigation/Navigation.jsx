import React, { useState } from 'react';
import { Menu, ChevronDown, Rocket, Plus, Minus } from 'lucide-react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';

const Navigation = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});

  const categories = [
    {
      name: 'Fashion',
      tagline: 'Effortless Chic for Every Day',
      subcategories: [
        {
          name: 'Women',
          items: ['Sarees', 'Tops', 'Jeans', 'Kurtas & Suits']
        },
        {
          name: 'Girls',
          items: ['Kurtas & Suits', 'Tops', 'Dresses']
        },
        {
          name: 'Men',
          items: ['Shirts', 'T-Shirts', 'Jeans', 'Formal Wear']
        }
      ]
    },
    {
      name: 'Electronics',
      tagline: 'Tech That Powers Your World',
      subcategories: [
        {
          name: 'Mobile',
          items: ['Apple', 'Samsung', 'OPPO', 'Vivo']
        },
        {
          name: 'Laptops',
          items: ['Gaming Laptops', 'Business Laptops', 'Ultrabooks']
        },
        {
          name: 'Smart Watch',
          items: ['Apple Watch', 'Samsung Watch', 'Fitness Trackers']
        },
        {
          name: 'Chargers',
          items: ['Fast Chargers', 'Wireless Chargers', 'Power Banks']
        }
      ]
    },
    {
      name: 'Bags',
      tagline: 'Carry Your Statement Piece',
      subcategories: [
        {
          name: 'Men Bags',
          items: ['Backpacks', 'Laptop Bags', 'Travel Bags']
        },
        {
          name: 'Women Bags',
          items: ['Handbags', 'Clutches', 'Tote Bags', 'Crossbody Bags']
        }
      ]
    },
    {
      name: 'Footwear',
      tagline: 'Step Into Style',
      subcategories: [
        {
          name: 'Men Footwear',
          items: ['Casual Shoes', 'Formal Shoes', 'Sports Shoes']
        },
        {
          name: 'Women Footwear',
          items: ['Heels', 'Flats', 'Boots', 'Sneakers']
        }
      ]
    },
    {
      name: 'Groceries',
      tagline: 'Fresh & Healthy Living'
    },
    {
      name: 'Beauty',
      tagline: 'Glow with Confidence'
    },
    {
      name: 'Wellness',
      tagline: 'Your Health, Our Priority'
    },
    {
      name: 'Jewellery',
      tagline: 'Sparkle in Every Moment'
    }
  ];

  const handleMenuHover = (index) => {
    setActiveMenu(index);
  };

  const handleMenuLeave = () => {
    setActiveMenu(null);
  };

  const toggleCategoryExpansion = (categoryName) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsCategoryMenuOpen(open);
  };

  const DrawerContent = () => (
    <Box
      sx={{ width: 350 }}
      role="presentation"
    >
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="div">
          Shop By Categories
        </Typography>
        <IconButton onClick={toggleDrawer(false)}>
          ×
        </IconButton>
      </Box>
      <Divider />
      <List>
        {categories.map((category, index) => (
          <Box key={index}>
            <ListItem disablePadding>
              <ListItemButton 
                onClick={() => category.subcategories && toggleCategoryExpansion(category.name)}
                sx={{ px: 3 }}
              >
                <ListItemText primary={category.name} />
                {category.subcategories && (
                  expandedCategories[category.name] ? <Minus size={16} /> : <Plus size={16} />
                )}
              </ListItemButton>
            </ListItem>
            
            {category.subcategories && (
              <Collapse in={expandedCategories[category.name]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {category.subcategories.map((subcategory, subIndex) => (
                    <ListItemButton key={subIndex} sx={{ pl: 6 }}>
                      <ListItemText primary={subcategory.name} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
            
            <Divider />
          </Box>
        ))}
      </List>
    </Box>
  );

  return (
    <nav className="navigation bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 flex items-center justify-between lg:justify-start gap-8">
        {/* Shop by Categories Button */}
        <div className="col_1 w-full lg:w-[20%]">
          <button 
            className="flex items-center gap-2 w-full text-black text-[14px] font-[500] py-4 hover:text-primeColor transition-colors"
            onClick={toggleDrawer(true)}
          >
            <Menu className="text-[18px]" />
            Shop By Categories
            <ChevronDown className="text-[13px] ml-auto font-bold" />
          </button>

          <Drawer
            anchor="left"
            open={isCategoryMenuOpen}
            onClose={toggleDrawer(false)}
          >
            {DrawerContent()}
          </Drawer>
        </div>

        {/* Main Navigation */}
        <div className="col_2 hidden lg:block w-full lg:w-[60%]">
          <ul className="flex items-center gap-3 nav">
            <li className="list-none">
              <a href="/" className="link transition text-[14px] font-[500]">
                <button className="link transition font-[500] text-[rgba(0,0,0,0.8)] hover:text-primeColor py-4 px-2">
                  Home
                </button>
              </a>
            </li>
            
            {categories.map((category, index) => (
              <li 
                key={index}
                className="list-none relative"
                onMouseEnter={() => handleMenuHover(index)}
                onMouseLeave={handleMenuLeave}
              >
                <a href={`/products?catId=${category.name.toLowerCase()}`} className="link transition text-[14px] font-[500]">
                  <button className="link transition font-[500] text-[rgba(0,0,0,0.8)] hover:text-primeColor py-4 px-2">
                    {category.name}
                  </button>
                </a>

                {/* Submenu */}
                {category.subcategories && activeMenu === index && (
                  <div className="submenu absolute top-[120%] left-[0%] min-w-[200px] bg-white shadow-lg opacity-100 transition-all z-50 border rounded-lg">
                    <ul className="py-2">
                      {category.subcategories.map((subcategory, subIndex) => (
                        <li key={subIndex} className="list-none w-full relative group">
                          <a className="w-full" href={`/products?subCatId=${subcategory.name.toLowerCase()}`}>
                            <button className="text-[rgba(0,0,0,0.8)] hover:text-pimeColor hover:bg-gray-50 w-full text-left justify-start rounded-none py-2 px-4 text-[14px]">
                              {subcategory.name}
                            </button>
                          </a>
                          
                          {/* Third Level Menu */}
                          {subcategory.items && (
                            <div className="thirdLevel absolute top-[0%] left-[100%] min-w-[150px] bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-all border rounded-lg">
                              <ul className="py-2">
                                {subcategory.items.map((item, itemIndex) => (
                                  <li key={itemIndex} className="list-none w-full">
                                    <a className="w-full" href={`/products?item=${item.toLowerCase()}`}>
                                      <button className="text-[rgba(0,0,0,0.8)] hover:text-primeColor hover:bg-gray-50 w-full text-left justify-start rounded-none py-2 px-4 text-[13px]">
                                        {item}
                                      </button>
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Free Delivery Info */}
        <div className="col_3 hidden lg:block w-[20%]">
          <p className="text-[14px] font-[500] flex items-center gap-3 mb-0 mt-0 text-gray-700">
            <Rocket className="text-[18px] text-primeColor" />
            Free International Delivery
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;