import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Rating,
  Chip,
  Button,
  Divider
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Clear as ClearIcon
} from '@mui/icons-material';
import { categoriesData } from '../../../../constants/productsData';

const ProductFilter = ({ onFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 60000]);
  const [selectedRatings, setSelectedRatings] = useState([]);

  // Function to apply filters and call the parent callback
  const applyFilters = (categories, price, ratings) => {
    onFilterChange({
      categories: categories,
      priceRange: { min: price[0], max: price[1] },
      ratings: ratings
    });
  };

  const handleCategoryChange = (categoryId) => {
    const updatedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];
    setSelectedCategories(updatedCategories);
    applyFilters(updatedCategories, priceRange, selectedRatings);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
    // This will update while dragging
    applyFilters(selectedCategories, newValue, selectedRatings);
  };

  const handleRatingChange = (rating) => {
    const updatedRatings = selectedRatings.includes(rating)
      ? selectedRatings.filter(r => r !== rating)
      : [...selectedRatings, rating];
    setSelectedRatings(updatedRatings);
    applyFilters(selectedCategories, priceRange, updatedRatings);
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 60000]);
    setSelectedRatings([]);
    applyFilters([], [0, 60000], []);
  };

  const hasActiveFilters = selectedCategories.length > 0 ||
    priceRange[0] > 0 || priceRange[1] < 60000 ||
    selectedRatings.length > 0;

  return (
    <Paper elevation={1} sx={{ p: 0, borderRadius: 2 }}>
      {/* Filter Header */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'grey.200' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Filters
          </Typography>
          {hasActiveFilters && (
            <Button
              size="small"
              onClick={clearAllFilters}
              startIcon={<ClearIcon />}
              sx={{ color: 'error.main' }}
            >
              Clear All
            </Button>
          )}
        </Box>
        {hasActiveFilters && (
          <Typography variant="caption" color="text.secondary">
            {selectedCategories.length + selectedRatings.length + (priceRange[0] > 0 || priceRange[1] < 60000 ? 1 : 0)} filters applied
          </Typography>
        )}
      </Box>

      {/* Categories Filter */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
            Categories
            {selectedCategories.length > 0 && (
              <Chip
                size="small"
                label={selectedCategories.length}
                sx={{ ml: 1, height: 20 }}
                color="primary"
              />
            )}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {categoriesData.map(category => (
              <FormControlLabel
                key={category.id}
                control={
                  <Checkbox
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCategoryChange(category.id)}
                    size="small"
                  />
                }
                label={category.name}
                sx={{
                  '& .MuiFormControlLabel-label': { fontSize: '0.875rem' },
                  '&:hover': { bgcolor: 'grey.50', borderRadius: 1 },
                  px: 1,
                  py: 0.5,
                  mx: -1
                }}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      <Divider />

      {/* Price Range Filter */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
            Price Range
            {(priceRange[0] > 0 || priceRange[1] < 60000) && (
              <Chip
                size="small"
                label="Active"
                sx={{ ml: 1, height: 20 }}
                color="primary"
              />
            )}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ px: 2 }}>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={60000}
              step={1000}
              marks={[
                { value: 0, label: 'Rs 0' },
                { value: 30000, label: 'Rs 30K' },
                { value: 60000, label: 'Rs 60K' }
              ]}
              sx={{ mt: 2 }}
              valueLabelFormat={(value) => `Rs ${value.toLocaleString()}`}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                From: <strong>Rs {priceRange[0].toLocaleString()}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                To: <strong>Rs {priceRange[1].toLocaleString()}</strong>
              </Typography>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Divider />

      {/* Rating Filter */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
            Rating
            {selectedRatings.length > 0 && (
              <Chip
                size="small"
                label={selectedRatings.length}
                sx={{ ml: 1, height: 20 }}
                color="primary"
              />
            )}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {[5, 4, 3, 2, 1].map(rating => (
              <FormControlLabel
                key={rating}
                control={
                  <Checkbox
                    checked={selectedRatings.includes(rating)}
                    onChange={() => handleRatingChange(rating)}
                    size="small"
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Rating value={rating} readOnly size="small" />
                    <Typography variant="body2">& up</Typography>
                  </Box>
                }
                sx={{
                  '&:hover': { bgcolor: 'grey.50', borderRadius: 1 },
                  px: 1,
                  py: 0.5,
                  mx: -1
                }}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};

export default ProductFilter;